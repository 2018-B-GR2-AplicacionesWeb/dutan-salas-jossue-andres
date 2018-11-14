//01-tipos-variables.ts

let nombre = 'Adrian';
let edad: number | string = 21.2;
let casado = false;

const arregloNumeros: number[] | Date[] | string[] = [1, 2, 3];
const fecha = new Date();
let palabra: any;

// nombre = 2; no es posible
nombre = '2';
edad = '2';

casado = true;
casado = null;
casado = undefined;

arregloNumeros.push(3e432);
arregloNumeros[1].toString();

const adrian: { //interface
    nombre: string;
    apellido?: string;
    edad: number;
    casado?: boolean
    fechaNacimiento: Date
    saludar?: (nombre: string) => string
} = {//JSON
    nombre: 'Adrian',
    edad: 21,
    casado: false,
    fechaNacimiento: new Date(),
    saludar: () => {
        return '';
    }
};

console.log(adrian)

function saludar(
    nombre: string,
    apellido?: string,
    ...otrosNombres: number[]
): string | number {
    return 'hola';
}

let respuestaSaludar = <number> saludar('', '', 2, 1, 3, 5, 7);

const saludarDos = (nombre: string): string => {
    return ''
};

class UsuaioClase {
  nombre:string;
}

interface UsuarioInterface {
    nombre:string;
}

const usuario = {
    nombre:'Adrian'
};
