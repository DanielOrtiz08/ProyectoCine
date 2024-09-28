class Reservacion {
    public idReservacion: Number;
    public precio: number;
    public idPersona: number;
    public idFuncion: number;

    constructor(cod: Number, pre: number, idPersona: number, idFuncion: number) {
        this.idReservacion = cod;
        this.precio = pre;
        this.idPersona = idPersona;
        this.idFuncion = idFuncion;
    }
}

export default Reservacion;
