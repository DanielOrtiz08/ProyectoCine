class Cartelera {
    public idPelicula: Number;
    public idCine: Number;
    public fechaInicioCartelera: Date | null;
    public fechaFinCartelera: Date | null;

    constructor (idPe:Number, idC: Number, feIni: Date | null = null, feFin: Date | null= null) {
        this.idPelicula = idPe;
        this.idCine = idC;
        this.fechaInicioCartelera = feIni;
        this.fechaFinCartelera = feFin;
    }
}
export default Cartelera;