class Sala {
    public idSala: Number;
    public formatoSala: string;
    public capacidadSala: number;
    public idCine: number;

    constructor(cod: Number, form: string, cap: number, idC: number) {
        this.idSala = cod;
        this.formatoSala = form;
        this.capacidadSala = cap;
        this.idCine = idC;
    }
}

export default Sala;