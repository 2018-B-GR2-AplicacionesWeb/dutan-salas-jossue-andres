// 08-promesas.js
const fs = require('fs');

const promesa = (nombreArchivo) => {
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

const promesaEscritura = (
    nombreArchivo,
    contenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreArchivo,
                contenidoArchivo,
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoArchivo);
                    }
                }
            );
        }
    );
};

console.log(promesa);
promesa('07-texto.txt')
    .then(
        (contenido) => {
            console.log('Ok', contenido);
            return promesaEscritura(
                '07-texto.txt',
                contenido + 'Nuevo Contenido');
            // Promesa
        }
    )
    .then(
        (contenidoCompleto) => {
            console.log(contenidoCompleto);
        }
    )
    .catch(
        (error) => {
            console.log('Mal', error);
        }
    );

//Ejercicio AppendFile en promesa

const PromesaAppend = (nombreArchivo, contenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                'utf8',
                (err, contenidoLeidoDelArchivo) => {
                    if (err) {
                        fs.writeFile(
                            nombreArchivo,
                            contenidoArchivo,
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(contenidoArchivo);
                                }

                            }
                        )
                    } else {
                        fs.writeFile(
                            nombreArchivo,
                            contenidoLeidoDelArchivo + contenidoArchivo,
                            (err) => {
                                if (err) {
                                    reject(err)
                                }
                                else {
                                    resolve(contenidoLeidoDelArchivo + contenidoArchivo)
                                }
                            }
                        )
                    }
                }
            )
        }
    );
};

PromesaAppend('07-ejemplo2.txt', ' Saludos')
    .then(
        (contenidoArchivo) => {
            console.log(contenidoArchivo)
        }
    )
    .catch(
        (error) => {
            console.log('Mal', error)
        }
    );