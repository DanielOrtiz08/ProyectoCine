import { Router } from "express";
import reservacionControlador from "../controller/ReservacionControlador";

class ReservacionRuta {
    public apiRutaReservacion: Router;

    constructor() {
        this.apiRutaReservacion = Router();
        this.misRutas();
    }

    private misRutas(): void {
        this.apiRutaReservacion.get("/getAll", reservacionControlador.obtenerTodasReservaciones.bind(reservacionControlador));
        this.apiRutaReservacion.get("/get/:idReservacion", reservacionControlador.obtenerReservacionPorID.bind(reservacionControlador));
        this.apiRutaReservacion.post("/create", reservacionControlador.crearReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.put("/update", reservacionControlador.actualizarReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.delete("/delete", reservacionControlador.eliminarReservacion.bind(reservacionControlador));
        
        // Rutas adicionales
        this.apiRutaReservacion.get("/paginate", reservacionControlador.paginarReservaciones.bind(reservacionControlador));
        this.apiRutaReservacion.put("/price/function", reservacionControlador.actualizarPrecioPorFuncion.bind(reservacionControlador));
        this.apiRutaReservacion.put("/price/person", reservacionControlador.actualizarPrecioPorPersona.bind(reservacionControlador));
        this.apiRutaReservacion.get("/count/:idFuncion", reservacionControlador.contarReservasPorFuncion.bind(reservacionControlador));
        this.apiRutaReservacion.get("/seats/:idReservacion", reservacionControlador.obtenerSillasPorReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.post("/seats/add", reservacionControlador.agregarSillasAReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.delete("/seats/:idReservacion/:idSilla", reservacionControlador.eliminarSillasDeReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.post("/products/add", reservacionControlador.agregarProductoAReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.get("/products/:id_reservacion", reservacionControlador.obtenerProductosPorReservacion.bind(reservacionControlador));
        this.apiRutaReservacion.delete("/products/:id_reservacion/:id_producto", reservacionControlador.eliminarProductoDeReservacion.bind(reservacionControlador));
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