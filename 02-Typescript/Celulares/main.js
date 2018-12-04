const rxjs = require('rxjs');
const fs = require('fs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const inquirer = require('inquirer');
const celular = require('./Entidades/EntCelular');
const cliente = require('./Entidades/EntCliente');
const clienteFunciones = require('./Lógica/NegCliente');
const preguntasIngresoCelular = [
    {
        type: 'input',
        name: 'idCelular',
        message: "Cuál es el id del celular",
    },
    {
        type: 'input',
        name: 'descCelular',
        message: "Cuál es la descripción",
    },
    {
        type: 'input',
        name: 'precioCelular',
        message: "Cuál es el precio del celular",
    },
];
const preguntasIngresoCliente = [
    {
        type: 'input',
        name: 'idCliente',
        message: 'Cual es el id'
    },
    {
        type: 'input',
        name: 'nombreCliente',
        message: 'Cual es el nombre'
    },
];
const opcionesCelular = [
    {
        type: 'list',
        name: 'opcionesCelular',
        message: ' Escoja una opción...',
        choices: ['Ingresar Celular', 'Buscar Celular', 'Borrar Celular', 'Actualizar Celular', 'Salir']
    }
];
const opcionesCliente = [
    {
        type: 'list',
        name: 'opcionesCliente',
        message: 'Escoja una opción...',
        choices: ['Ingresar Cliente', 'Buscar Cliente', 'Borrar Cliente', 'Actualizar Cliente', 'Salir']
    }
];
const preguntaClienteBusquedaPorId = [
    {
        type: 'input',
        name: 'idCliente',
        message: 'Escribe el id del cliente'
    }
];
const preguntaClienteNuevoNombre = [
    {
        type: 'input',
        name: 'nombreCliente',
        message: 'Escribe tu nuevo nombre'
    }
];
function inicializarBase() {
    return new Promise((resolve, reject) => {
        fs.readFile('Base de Datos/bdd.json', 'utf-8', (err, contenido) => {
            if (err) {
                fs.writeFile('Base de Datos/bdd.json', '{"clientes":[],"celulares":[]}', (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error',
                            error: 500
                        });
                    }
                    resolve({
                        mensaje: 'ok',
                        bdd: JSON.parse('{"clientes":[],"celulares":[]}')
                    });
                });
            }
            else {
                resolve({
                    mensaje: 'BDD Leida',
                    bdd: JSON.parse(contenido)
                });
            }
        });
    });
}
function main() {
    const respuestaBDD$ = rxjs.from(inicializarBase());
    respuestaBDD$
        .pipe(preguntarOpcionesCliente(), pedirDatosCliente(), ejecutarAccion(), guardarBaseDeDatos())
        .subscribe((data) => {
        console.log(data);
    }, (error) => {
        console.log(error);
    }, () => {
        main();
        console.log('Complete');
    });
}
function preguntarOpcionesCliente() {
    return mergeMap((respuestaBDD) => {
        return rxjs
            .from(inquirer.prompt(opcionesCliente))
            .pipe(map((respuesta) => {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
        }));
    });
}
function pedirDatosCliente() {
    return mergeMap((respuestaBDD) => {
        const opcionCliente = respuestaBDD.opcionMenu.opcionesCliente;
        switch (opcionCliente) {
            case 'Ingresar Cliente':
                return rxjs
                    .from(inquirer.prompt(preguntasIngresoCliente))
                    .pipe(map((cliente) => {
                    respuestaBDD.cliente = cliente;
                    return respuestaBDD;
                }));
            case 'Actualizar Cliente':
                return preguntarIdCliente(respuestaBDD);
            case "Buscar Cliente":
                return preguntarIdClienteBuscado(respuestaBDD);
            case "Borrar Cliente":
                return preguntarIdClienteBuscado(respuestaBDD);
        }
    });
}
function preguntarIdCliente(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaClienteBusquedaPorId))
        .pipe(mergeMap(// RESP ANT OBS
    (respuesta) => {
        const indiceCliente = respuestaBDD.bdd.clientes
            .findIndex(// -1
        (cliente) => {
            return cliente.idCliente === respuesta.idCliente;
        });
        if (indiceCliente === -1) {
            console.log('Preguntando de nuevo');
            return preguntarIdCliente(respuestaBDD);
        }
        else {
            respuestaBDD.indiceCliente = indiceCliente;
            return rxjs
                .from(inquirer.prompt(preguntaClienteNuevoNombre))
                .pipe(map((cliente) => {
                respuestaBDD.cliente = {
                    idCliente: cliente.idCliente,
                    nombreCliente: cliente.nombreCliente
                };
                return respuestaBDD;
            }));
        }
    }));
}
function preguntarIdClienteBuscado(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaClienteBusquedaPorId))
        .pipe(map(// RESP ANT OBS
    (respuesta) => {
        const indiceCliente = respuestaBDD.bdd.clientes
            .findIndex(// -1
        (cliente) => {
            return cliente.idCliente === respuesta.idCliente;
        });
        respuestaBDD.indiceCliente = indiceCliente;
        return respuestaBDD;
    }));
}
function ejecutarAccion() {
    return map((respuestaBDD) => {
        const opcion = respuestaBDD.opcionMenu.opcionesCliente;
        switch (opcion) {
            case "Ingresar Cliente":
                const cliente = respuestaBDD.cliente;
                console.log(cliente);
                respuestaBDD.bdd.clientes.push(cliente);
                return respuestaBDD;
            case "Actualizar Cliente":
                const indice = respuestaBDD.indiceCliente;
                respuestaBDD.bdd.clientes[indice].nombreCliente = respuestaBDD.cliente.nombreCliente;
                return respuestaBDD;
            case "Buscar Cliente":
                const indiceBuscado = respuestaBDD.indiceCliente;
                if (indiceBuscado === -1) {
                    console.log('No se encontró al cliente');
                }
                else {
                    console.log('Cliente encontrado: ', respuestaBDD.bdd.clientes[indiceBuscado]);
                }
                return respuestaBDD;
            case "Borrar Cliente":
                const indiceClienteBorrar = respuestaBDD.indiceCliente;
                if (indiceClienteBorrar === -1) {
                    console.log('No se encontró al cliente');
                }
                else {
                    respuestaBDD.bdd.clientes.splice(indiceClienteBorrar, 1);
                }
                return respuestaBDD;
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap((respuestaBDD) => {
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
function guardarBDD(bdd) {
    return new Promise((resolve, reject) => {
        fs.writeFile('Base de Datos/bdd.json', JSON.stringify(bdd), (error) => {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
main();
