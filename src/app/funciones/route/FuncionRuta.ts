import { Router } from "express";
import funcionControlador from "../controller/FuncionControlador";

class FuncionRuta {
    public apiRutaFuncion:Router;

    constructor() {
        this.apiRutaFuncion = Router();
        this.misRutas();
    }

    private misRutas(): void {
        this.apiRutaFuncion.get("/getFunciones", funcionControlador.dameFuncion);
        this.apiRutaFuncion.get("/getFuncionesPaginadas", funcionControlador.paginarFunciones);
        this.apiRutaFuncion.post("/addFuncion", funcionControlador.cogeTuFuncion);
        this.apiRutaFuncion.delete("/deleteFuncion/:idFuncion", funcionControlador.borraTuFuncion);
        this.apiRutaFuncion.put("/updateFuncion", funcionControlador.actualizaTuFuncion);
        this.apiRutaFuncion.put("/updateFuncionesPorSala", funcionControlador.actualizaFuncionesPorSala);
        this.apiRutaFuncion.put("/updateFechaFunciones", funcionControlador.actualizaFechasFunciones);
        
    }
}
const peliculaRuta= new FuncionRuta();
export default peliculaRuta.apiRutaFuncion;