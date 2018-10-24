//recibe argumentos y devuelve argumentos

function sumarDosNumeros(numUno, numDos) {
    //validaciones
    var numeroUnoEsNumber = typeof numUno == "number";
    var numeroDosEsNumber = typeof numDos == "number";

    if (numeroUnoEsNumber && numeroUnoEsNumber) {
        return numUno + numDos;
    } else{
        return 0; //ERROR
    }
}

//No hay error

//envio otros parámetros
console.log(sumarDosNumeros('a', null));

//no envio parámetros
console.log(sumarDosNumeros());

//envio parametros extra
console.log(sumarDosNumeros(1, 2, 3, 4));

console.log(sumarDosNumeros(1,6));

function saludar() {
    console.log('Hola a todos');
}

console.log(saludar()); //una función sin return devuelve undefined -> void

function sumarNumeros(numeroUno, numeroDos, ...parametros) {
    console.log(parametros);
    var i = 0;
    var suma = numeroUno + numeroDos;
    for (i; i<parametros.length; i++){
        suma = suma + parametros[i];
    }
    return suma
}

console.log(sumarNumeros(1,2,3,4));

//"Jossue" -> "Hola JOSSUE"

function saludar(nombre, funcionMensajeria) { //se puede mandar funciones como parámetros
    var saludo = `Hola ${nombre.toUpperCase()}`; //
    funcionMensajeria(saludo); //por ejemplo mandar un console log que recibe un parámetro string
    return saludo;
}

//function saludar ("jossue", console.log), se puede mandar en alerta, correo, base de datos, etc
/* "Hola JOSSUE" en consola
   "Hola JOSSUE" en return
 */

function imprimirConsola(saludo){
    console.log(saludo);
}

