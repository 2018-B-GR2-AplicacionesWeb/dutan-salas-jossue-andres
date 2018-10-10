var nombreVariable = 'valorVariable';
var edad = 1; //t: number
var edad2 = '1'; //t: string
var edad = 1.1; //number
var casado = false; //boolean
var amigable = null; // object
var existeoNo = undefined; // undefined en valor y tipo
var fechaNacimiento = new Date('1996-09-23');


console.log('edad', typeof edad);
console.log('edad2', typeof edad2);
console.log('casado', typeof casado);
console.log('amigable', typeof amigable);
console.log('existe o No', typeof existeoNo);
console.log('fechaNacimiento', typeof fechaNacimiento, fechaNacimiento);

//JS es un lenguaje no tipado

//Tipado
// int edad = 10;

//No tipado
// var edad = 10;

//JS


var adrian = {};

console.log(typeof adrian); //object

var jossue = {
    nombre: 'Jossue',
    edad: 22,
    llave: 'valor',
    "llave2": "valor",
};

console.log(jossue.nombre); // 'Jossue'
console.log(jossue.edad); // 22


var jossueJSOn = {
  "llave":'valor' //error si se pone una coma
};

console.log(10+10);

if (true){ //cuando no es true pero significa verdadero es truthy
    //si ++ cuando está en números, objetos, nombres...
} else {
    //no cuando está en 0, null, undefined, fallsy
}
