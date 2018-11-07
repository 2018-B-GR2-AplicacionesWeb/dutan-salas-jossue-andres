//01-tipos-variables.ts
let nombre = 'Adrian';
let edad = 21.2;
let casado = false;
const arregloNumeros = [1, 2, 3];
const fecha = new Date();
let palabra;
// nombre = 2; no es posible
nombre = '2';
edad = '2';
casado = true;
casado = null;
casado = undefined;
arregloNumeros.push(3e432);
arregloNumeros[1].toString();
const adrian = {
    nombre: 'Adrian',
    edad: 21,
    casado: false,
    fechaNacimiento: new Date(),
    saludar: () => {
        return '';
    }
};
function saludar(nombre, apellido, ...otrosNombres) {
    return 'hola';
}
let respuestaSaludar = saludar('', '', 2, 1, 3, 5, 7);
const saludarDos = (nombre) => {
    return '';
};
class UsuaioClase {
}
const usuario = {
    nombre: 'Adrian'
};
