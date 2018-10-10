//Métodos de los arreglos
var arreglo = [
    1,
    2.2,
    "Hola",
    false,
    {},
    undefined,
    null,
    []
];

var arregloNumeros = [1,2,3];

arregloNumeros[0]; //1

console.log(arregloNumeros[4]); //undefined

arregloNumeros.push(4); //agrega al final

console.log(arregloNumeros);
arregloNumeros.pop();

console.log(arregloNumeros);

arregloNumeros.splice(0,1); //borra desde una posición
console.log(arregloNumeros);

arregloNumeros.splice(0,0,0); //borrar 0 en la posición 0 insertar un 0

console.log(arregloNumeros);

arregloNumeros.splice(2,0,2.5); //insertara un 2.5

console.log(arregloNumeros);
var usuario = 2.5

//como borrar al usuario solo sabiendo su valor?

console.log(arregloNumeros.indexOf(2.5));

var indiceUsuario = arregloNumeros.indexOf(usuario);
arregloNumeros.splice(indiceUsuario, 1);
console.log(arregloNumeros);


arregloNumeros.push(3);
arregloNumeros.push(4);
arregloNumeros.slice(0,2);
console.log(arregloNumeros);

var arregloNotasPrimerBimestre = [8.5, 9, 4];
var arregloNotasSegundoBimestre = [8.5, 9, 4];

//Destructuración de arreglos
var arregloNotas2018B = [...arregloNotasPrimerBimestre, ...arregloNotasSegundoBimestre];
console.log(arregloNotas2018B);

//Destructuración de objetos
var jossue2018A = {
    sexualidad: 0,
    web: 7
};
var jossue2018B = {
    musica: 7,
    moviles: 8
};

var jossue = {
    ...jossue2018A,
    ...jossue2018B
}

console.log(jossue);

