import { Router } from "express";
import reservacionControlador from "../controller/ReservacionControlador";

class ReservacionRuta {
    public apiRutaReservacion: Router;

    constructor() {
        this.apiRutaReservacion = Router();
        this.misRutas();
    }

    private misRutas(): void {
        this.apiRutaReservacion.get("/reservaciones", reservacionControlador.obtenerTodasReservaciones.bind(reservacionControlador));
        this.apiRutaReservacion.get("/reservaciones/:idReservacion", reservacionControlador.obtenerReservacionPorID.bind(reservacionControlador));
        this.apiRutaReservacion.post("/reservaciones", reservacionControlador.crearReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.put("/reservaciones", reservacionControlador.actualizarReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.delete("/reservaciones", reservacionControlador.eliminarReservacion.bind(reservacionControlador));
        
        // Rutas adicionales
        this.apiRutaReservacion.get("/reservaciones/pagina", reservacionControlador.paginarReservaciones.bind(reservacionControlador));
        this.apiRutaReservacion.put("/reservaciones/precio/funcion", reservacionControlador.actualizarPrecioPorFuncion.bind(reservacionControlador));
        this.apiRutaReservacion.put("/reservaciones/precio/persona", reservacionControlador.actualizarPrecioPorPersona.bind(reservacionControlador));
        this.apiRutaReservacion.get("/reservaciones/cantidad/:idFuncion", reservacionControlador.contarReservasPorFuncion.bind(reservacionControlador));
        this.apiRutaReservacion.get("/reservaciones/sillas/:idReservacion", reservacionControlador.obtenerSillasPorReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.post("/reservaciones/sillas", reservacionControlador.agregarSillasAReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.delete("/reservaciones/sillas/:idReservacion", reservacionControlador.eliminarSillasDeReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.post("/reservaciones/producto", reservacionControlador.agregarProductoAReservacion.bind(reservacionControlador));
    }
}

const reservacionRuta = new ReservacionRuta();
export default reservacionRuta.apiRutaReservacion;
