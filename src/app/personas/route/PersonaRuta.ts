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
        this.apiRutaPersona.get("/paginacionPersona", personaControlador.paginacionPersona);
        this.apiRutaPersona.post("/addPersona", personaControlador.cogeTuPersona);
        this.apiRutaPersona.delete("/deletePersona/:numeroDocumento", personaControlador.borraTuPersona);
        this.apiRutaPersona.put("/updatePersona", personaControlador.actualizaPersona);
        this.apiRutaPersona.put("/updateCargo", personaControlador.cambioDeCargosPersona);
        
    }
}
const apiPersonaRuta= new PersonaRuta();
export default apiPersonaRuta.apiRutaPersona;