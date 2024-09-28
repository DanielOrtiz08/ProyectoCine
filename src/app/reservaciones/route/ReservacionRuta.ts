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
        this.apiRutaReservacion.delete("/reservaciones/:idReservacion/sillas/:idSilla", reservacionControlador.eliminarSillasDeReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.post("/reservaciones/producto", reservacionControlador.agregarProductoAReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.get("/reservaciones/:id_reservacion/productos",reservacionControlador.obtenerProductosPorReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.delete("/reservaciones/:id_reservacion/productos/:id_producto",reservacionControlador.eliminarProductoDeReservacion.bind(reservacionControlador));
    }
}

const reservacionRuta = new ReservacionRuta();
export default reservacionRuta.apiRutaReservacion;

/*
Dejar el .bind() es apropiado en este caso. Al usar el .bind(), aseguras que el contexto de this dentro de los métodos del controlador
 (como obtenerTodasReservaciones, crearReservacion, etc.) se mantenga correctamente atado al controlador original (reservacionControlador).
  Esto es importante porque los métodos del controlador pueden necesitar acceso al contexto (this) para usar propiedades o métodos 
  interno de la clase.

Si no usas .bind(), y pasas las funciones directamente, podrías perder el contexto de this al ser llamadas por Express, lo que puede 
generar errores cuando se intentan acceder a las propiedades del controlador.
*/