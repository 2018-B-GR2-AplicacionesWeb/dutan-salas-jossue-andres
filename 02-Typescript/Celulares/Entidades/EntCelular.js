module.exports = class EntCelular {
    constructor(idCelular, descripcion, precioCelular) {
        this.idCelular = idCelular;
        this.descCelular = descripcion;
        this.precioCelular = precioCelular;
    }
};
/*

module.exports = class Detalle {
    idDetalle: number;
    celular: Celular;
    cantidad: number;
    precioUnitario: Date;
    precioTotal: number;

    constructor(
        idDetalle: number,
        celular: Celular,
        cantidad: number,
        precioUnitario: Date,
        precioTotal: number
    ) {
        this.idDetalle = idDetalle;
        this.celular = celular;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.precioTotal = precioTotal;
    }
};

module.exports = class Factura {
    idFactura: number;
    cliente: Cliente;
    detalles: Detalle[];
    fechaFactura: Date;
    totalAPagar: number;

    constructor(
        idFactura: number,
        cliente: Cliente,
        detalles: Detalle[],
        fechaFactura: Date,
        totalAPagar: number) {
        this.idFactura = idFactura;
        this.cliente = cliente;
        this.detalles = detalles;
        this.fechaFactura = fechaFactura;
        this.totalAPagar = totalAPagar;
    }

}

 */ 
