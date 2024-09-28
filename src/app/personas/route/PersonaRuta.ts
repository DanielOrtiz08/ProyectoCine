import { Router } from "express";
import personaControlador from "../controller/PersonaControlador";

class PersonaRuta {
    public apiRutaPersona:Router;

    constructor() {
        this.apiRutaPersona = Router();
        this.apiRutaPersona.get("/getallPersona", personaControlador.damePersonas);
        this.misRutas();
    }

    private misRutas(): void {
        this.apiRutaPersona.get("/getallPersona", personaControlador.cogeTuPersona);
        this.apiRutaPersona.post("/addPersona", personaControlador.cogeTuPersona);
        this.apiRutaPersona.delete("/deletePersona/:idPersona", personaControlador.borraTuPersona);
        this.apiRutaPersona.put("/updatePersona", personaControlador.actualizaPersona);
    }
}
const personaRuta= new PersonaRuta();
export default personaRuta.apiRutaPersona;