declare var require: any;

const rxjs = require('rxjs');
const fs = require('fs');
const map = require('rxjs/operators').map; //Importar el map
const inquirer = require('inquirer');

//Entidades

class Celular {
    idCelular: number;
    descCelular: string;
    precioCelular: number;

    constructor(idCelular: number, descripcion: string, precioCelular: number) {
        this.idCelular = idCelular;
        this.descCelular = descripcion;
        this.precioCelular = precioCelular;
    }
}

/*
class Cliente {
    idCliente: number;
    nombreCliente: string;
    telefonoCliente: number;

    constructor(id: number, nombre: string, telefono: number) {
        this.idCliente = id;
        this.nombreCliente = nombre;
        this.telefonoCliente = telefono;
    }
}

class Detalle {
    idDetalle: number;
    celular: Celular;
    cantidad: number;
    precioUnitario: Date;
    precioTotal: number;

    constructor(
        idDetalle: number,
        celular: Celular,
        cantidad: number,
        precioUnitario: Date,
        precioTotal: number
    ) {
        this.idDetalle = idDetalle;
        this.celular = celular;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.precioTotal = precioTotal;
    }
}

class Factura {
    idFactura: number;
    cliente: Cliente;
    detalles: Detalle[];
    fechaFactura: Date;
    totalAPagar: number;

    constructor(
        idFactura: number,
        cliente: Cliente,
        detalles: Detalle[],
        fechaFactura: Date,
        totalAPagar: number) {
        this.idFactura = idFactura;
        this.cliente = cliente;
        this.detalles = detalles;
        this.fechaFactura = fechaFactura;
        this.totalAPagar = totalAPagar;
    }

}
*/
//Funciones

const promesaLectura = (nombreArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoLeido);
                    }
                }
            );
        }
    );
};
const promesaLecturaJSON = (nombreArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        reject(error);
                    } else {
                        let celular = JSON.parse(contenidoLeido);
                        resolve(celular)
                    }
                }
            );
        }
    );
};

const PromesaAppend = (nombreArchivo, contenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        const contenido = contenidoArchivo;
                        fs.writeFile(
                            nombreArchivo,
                            contenido,
                            (err) => {
                                if (err) reject(err);
                                else resolve(contenido)
                            }
                        )
                    } else {
                        const contenido = contenidoLeido + contenidoArchivo;
                        fs.writeFile(
                            nombreArchivo,
                            contenido,
                            (err) => {
                                if (err) reject(err);
                                else resolve(contenido);
                            }
                        )
                    }
                });
        })
};

/*
let celulares: Celular[];

const ingresarBase = (path: string) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                path,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoLeido);
                    }
                }
            );
        }
    )
};

const ingresarBaseCelular$ = rxjs.from(ingresarBase('Base de Datos/Celular.json'))

ingresarBaseCelular$
    .subscribe(
        (valor) => {
            valor.split("\n").forEach
            (
                (v)=> {
                    celulares.push(v);
                }
            )
        },
        (error) => {
            console.log('Error ', error)
        }
        ,
        () => {
            console.log('Completado')
        }
    )

celulares.forEach(
    (v) => {
        console.log(v)
    }
)
*/
function insertarCelular(id: number, descripcion: string, precio: number) {
    let nuevoCelular = new Celular(id, descripcion, precio);
    const contenido = nuevoCelular.idCelular + ',' + nuevoCelular.descCelular + ',' + nuevoCelular.precioCelular + '\n';
    insertarContenidoBaseCelular(contenido)
}

function insertarContenidoBaseCelular(contenido: string) {
    const celular$ = rxjs.from(PromesaAppend('Base de Datos/Celular.txt', contenido));

    celular$
        .subscribe(
            (ok) => {
                console.log('Insertado\n', ok)
            },
            (error) => {
                console.log('Insertado mal ', error)
            },
            () => {
                console.log('Completado')
            }
        )
}
function insertarContenidoJSONCelular(contenido: string) {
    const celular$ = rxjs.from(PromesaAppend('Base de Datos/Celular.json', contenido));

    celular$
        .subscribe(
            (ok) => {
                console.log('Insertado\n', ok)
            },
            (error) => {
                console.log('Insertado mal ', error)
            },
            () => {
                console.log('Completado')
            }
        )
}

function listarCelulares() {
    const celularLectura$ = rxjs.from(promesaLectura('Base de Datos/Celular.txt'));

    celularLectura$

        .subscribe(
            (ok) => {
                console.log('Leido:\n', ok)
            },
            (error) => {
                console.log('Leido mal ', error)
            },
            () => {
                console.log('Completado')
            }
        )
}

const celularLecturaJSON$ = rxjs.from(promesaLecturaJSON('Base de Datos/Celular.json'));

function borrarCelularJSON(idCelular:number) {

    celularLecturaJSON$

        .subscribe(
            (ok) => {
                if (idCelular === ok.idCelular){
                    delete ok[idCelular]
                }
            },
            (error) => {
                console.log('Leido mal ', error)
            },
            () => {
                console.log('Completado')
            }
        )
}


//Inquire

const questions = [
    {
        type: 'input',
        name: 'idCelular',
        message: "Cuál es el id del celular",
        default: function() {
            return '';
        }
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

const opciones = [
    {
        type: 'list',
        name: 'opcionesIniciales',
        message: 'Bienvenido \n Escoja una opción...',
        choices: ['Ingresar Dispositivo', 'Listar Dispositivos','Borrar Celular', 'Salir']
    }
];



inquirer.prompt(opciones)
    .then(
        answers => {
            if(answers.opcionesIniciales === 'Ingresar Dispositivo'){
                inquirer.prompt(questions).then(answers => {
                    const res = JSON.stringify(answers, null, '  ');
                    //console.log(res)
                    const coma = ',';
                    insertarContenidoJSONCelular(res+coma);
                    insertarContenidoBaseCelular(res);
                    // fs.writeFileSync('Base de Datos/Celulares.json', res , 'utf-8');

                });
            }
            if(answers.opcionesIniciales === 'Borrar Celular'){
                borrarCelularJSON(2);
            }
            if(answers.opcionesIniciales === 'Listar Dispositivos'){
                listarCelulares()
                promesaLecturaJSON('Base de Datos/Celular.json')
            }
            if(answers.opcionesIniciales === 'Salir'){
                console.log('Gracias por usar la aplicación')
            }
        }

    )


