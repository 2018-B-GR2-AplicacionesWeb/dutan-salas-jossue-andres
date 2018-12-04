module.exports = class Cliente {
    idCliente: number;
    nombreCliente: string;

    constructor(id: number, nombre: string) {
        this.idCliente = id;
        this.nombreCliente = nombre;
    }
};