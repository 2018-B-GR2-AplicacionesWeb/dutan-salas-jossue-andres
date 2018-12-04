const fs = require('fs');
const PromesaEscritura = (nombreArchivo, contenidoArchivo) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(nombreArchivo, contenidoArchivo, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(contenidoArchivo);
            }
        });
    });
};
const promesaLectura = (nombreArchivo) => {
    return new Promise((resolve, reject) => {
        fs.readFile(nombreArchivo, 'utf-8', (error, contenidoLeido) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(contenidoLeido);
            }
        });
    });
};
const promesaLecturaJSON = (nombreArchivo) => {
    return new Promise((resolve, reject) => {
        fs.readFile(nombreArchivo, 'utf-8', (error, contenidoLeido) => {
            if (error) {
                reject(error);
            }
            else {
                let celularJSON = JSON.parse(contenidoLeido);
                resolve(celularJSON);
            }
        });
    });
};
const promesaAppend = (nombreArchivo, contenidoArchivo) => {
    return new Promise((resolve, reject) => {
        fs.readFile(nombreArchivo, 'utf-8', (error, contenidoLeido) => {
            if (error) {
                const contenido = contenidoArchivo;
                fs.writeFile(nombreArchivo, contenido, (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve(contenido);
                });
            }
            else {
                const contenido = contenidoLeido + contenidoArchivo;
                fs.writeFile(nombreArchivo, contenido, (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve(contenido);
                });
            }
        });
    });
};

module.exports = {
    PromesaEscritura: PromesaEscritura,
    promesaLectura: promesaLectura,
    promesaLecturaJSON: promesaLecturaJSON,
    promesaAppend: promesaAppend
}