
module.exports = {
    tipo:'privado',
    activo:true,
    version:'Windows 7',
    imprimir: () => {
        console.log(this.version);
    },
    archivos: [1,2,3]
}