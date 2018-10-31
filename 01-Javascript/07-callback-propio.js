// 07-callback-propio.js

const fs = require('fs');

function appendFile(nombreArchivo, contenidoArchivo, callback) {
    // 1. leer archivo
    // 2. concatenar contenido
    // 3. creamos el archivo
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
                        if (err) callback(err);
                        else callback(undefined,contenido)
                    }
                )
            } else {
                const contenido = contenidoLeido + contenidoArchivo;
                fs.writeFile(
                    nombreArchivo,
                    contenido,
                    (err) => {
                        if (err) callback(err);
                        else callback(undefined,contenido)
                    }
                )
            }
        })
}

appendFile(
    '07-texto.txt',
    ' Hola',
    (error, contenidoTexto) => {
        if(error) console.log(error)
        else console.log(contenidoTexto)
    });

// console.log(respuesta);
// ['A', 'B', 'C']


// 0-A.txt 'A'
// 1-B.txt 'B'
// 2-C.txt 'C'

const respuesta = {
    nombreArchivo:'0-A.txt',
    contenidoArchivo:'A',
    error: undefined
};

// [respuesta, respuesta, ...]

function ejercicio(
    arregloStrings,
    callback) {
    const arregloRespuestas = [];
    arregloStrings
        .forEach(
            (string, indice) => {
                const nombreArchivo = `${indice}-${string}.txt`;
                const contenidoArchio = string;

                fs.writeFile(
                    nombreArchivo,
                    contenidoArchio,
                    (err) => {
                        const respuesta = {
                            nombreArchivo: nombreArchivo,
                            contenidoArchivo: contenidoArchio,
                            error: err
                        };
                        arregloRespuestas.push(respuesta);
                        const terminoElArreglo = arregloStrings.length === arregloRespuestas.length;
                        if(terminoElArreglo){
                            callback(arregloRespuestas);
                        }

                    }
                )

            }
        );


}


ejercicio(
    ['A','B','C'],
    (arregloRespuestas)=>{
        console.log(arregloRespuestas);
    }
);
