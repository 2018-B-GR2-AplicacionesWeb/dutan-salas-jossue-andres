//01-tipos-variables.ts
var nombre = 'Adrian';
var edad = 21.2;
var casado = false;
var arregloNumeros = [1, 2, 3];
var fecha = new Date();
var palabra;
// nombre = 2; no es posible
nombre = '2';
edad = '2';
casado = true;
casado = null;
casado = undefined;
arregloNumeros.push(3e432);
arregloNumeros[1].toString();
var adrian = {
    nombre: 'Adrian',
    edad: 21,
    casado: false,
    fechaNacimiento: new Date(),
    saludar: function () {
        return '';
    }
};
console.log(adrian);
function saludar(nombre, apellido) {
    var otrosNombres = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        otrosNombres[_i - 2] = arguments[_i];
    }
    return 'hola';
}
var respuestaSaludar = saludar('', '', 2, 1, 3, 5, 7);
var saludarDos = function (nombre) {
    return '';
};
var UsuaioClase = /** @class */ (function () {
    function UsuaioClase() {
    }
    return UsuaioClase;
}());
var usuario = {
    nombre: 'Adrian'
};
