class Funcion {
    public idFuncion: Number;
    public idPelicula: Number;
    public tipoFuncion: string;
    public horaFuncion: string;
    public fechaFuncion: Date;
    public idSala: Number;
    

    constructor(idFun: Number, idPel: Number, tipoFun: string, horaFun: string, fechaFun: Date, idSal: Number) {
        this.idFuncion = idFun;
        this.idPelicula = idPel;
        this.tipoFuncion = tipoFun;
        this.horaFuncion = horaFun;
        this.fechaFuncion = fechaFun;
        this.idSala = idSal;
    }
}


export default Funcion;