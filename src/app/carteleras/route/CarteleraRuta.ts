import { Router } from "express";
import carteleraControlador from "../controller/CarteleraControlador";

class CarteleraRuta {
    public apiRutaCartelera:Router;

    constructor() {
        this.apiRutaCartelera = Router();
        this.misRutas();
    }

    private misRutas(): void {
        this.apiRutaCartelera.get("/getall", carteleraControlador.dameCarteleras);
        this.apiRutaCartelera.post("/add", carteleraControlador.cogeTuCartelera);
        this.apiRutaCartelera.delete("/delete/:idPelicula/:idCine", carteleraControlador.borraTuCartelera);
        this.apiRutaCartelera.put("/update", carteleraControlador.actualizaTuCartelera);
        this.apiRutaCartelera.get("/getpaginated", carteleraControlador.dameCartelerasPaginadas);
    }
}
const carteleraRuta= new CarteleraRuta();
export default carteleraRuta.apiRutaCartelera;