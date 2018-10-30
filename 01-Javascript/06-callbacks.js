// 06-callbacks.js

const fs = require('fs');

console.log('Inicio')

fs.readFile(
    '06-texto.txt', //nombre del archivp
    'utf8', //codificación
    (error, textoLeidoDelArchivo) => {
        // console.log(error);
        // console.log(textoLeidoDelArchivo);
        if (error) {
            try {
                throw new Error(error)
            } catch (e) {
                console.log(e)
            }
        } else {
            console.log('Inicio2')
            fs.writeFile(
                '06-texto.txt',
                textoLeidoDelArchivo + ' Mundo',
                (err) => {
                    if (err) console.log('Error');
                    else console.log('Archivo Actualizado')
                }
            )
            console.log('Fin2')

            console.log(textoLeidoDelArchivo)
        }
    }
);


console.log('Fin')
