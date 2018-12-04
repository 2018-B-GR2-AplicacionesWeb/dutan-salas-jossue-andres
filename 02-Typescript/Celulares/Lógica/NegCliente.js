const fs = require('fs');
const ingresarCliente = (cliente) => {
    return new Promise((resolve, reject) => {
        fs.readFile('Base de Datos/bdd.json', 'utf-8', (err, contenido) => {
            if (err) {
                reject({mensaje: 'Error leyendo'});
            }
            else {
                const bdd = JSON.parse(contenido);
                cliente.idCliente = Number(cliente.idCliente);
                bdd.clientes.push(cliente);
                fs.writeFile('Base de Datos/bdd.json', JSON.stringify(bdd), (err) => {
                    if (err) {
                        console.log('Error ', err);
                        reject(err);
                    }
                    else {
                        resolve({mensaje: 'Cliente creado'});
                    }
                });
            }
        });
    });
};
const editarCliente = (cliente, nuevoNombre) => {
    return new Promise((resolve, reject) => {
        fs.readFile('Base de Datos/bdd.json', 'utf-8', (err, contenido) => {
            if (err) {
                reject({mensaje: 'Error leyendo'});
            }
            else {
                const bdd = JSON.parse(contenido);
                const indiceUsuario = bdd.clientes
                    .findIndex((usuario) => usuario.idCliente === cliente.idCliente);
                bdd.clientes[indiceUsuario].nombre = nuevoNombre;
                fs.writeFile('Base de Datos/bdd.json', JSON.stringify(bdd), (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({mensaje: 'Cliente Editado'});
                    }
                });
            }
        });
    });
};
const borrarCliente = (cliente) => {
    return new Promise((resolve, reject) => {
        fs.readFile('Base de Datos/bdd.json', 'utf-8', (err, contenido) => {
            if (err) {
                reject({mensaje: 'Error leyendo'});
            }
            else {
                const bdd = JSON.parse(contenido);
                const indiceCliente = bdd.clientes.indexOf(cliente);
                bdd.clientes.splice(indiceCliente,1);
                fs.writeFile('Base de Datos/bdd.json', JSON.stringify(bdd), (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({mensaje: 'Cliente Borrado'});
                    }
                });
            }
        });
    });
};
const buscarClientePorNombre = (nombre) => {
    return new Promise((resolve, reject) => {
        fs.readFile('Base de Datos/bdd.json', 'utf-8', (err, contenido) => {
            if (err) {
                reject({mensaje: 'Error leyendo'});
            }
            else {
                const bdd = JSON.parse(contenido);
                const respuestaFind = bdd.clientes
                    .find((usuario) => {
                        return usuario.nombre === nombre;
                    });
                resolve(respuestaFind);
            }
        });
    });
};

module.exports = {
    ingresarCliente: ingresarCliente,
    editarCliente: editarCliente,
    buscarClientePorNombre: buscarClientePorNombre,
    borrarCliente: borrarCliente,
}