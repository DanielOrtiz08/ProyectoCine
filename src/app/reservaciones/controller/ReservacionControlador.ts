import { Response, Request } from "express";
import ReservacionDAO from "../dao/ReservacionDAO";
import Reservacion from "../entity/Reservacion";

class ReservacionControlador extends ReservacionDAO {

    // Controlador para la paginación de reservaciones
    public async paginarReservaciones(req: Request, res: Response): Promise<void> {
        const { limite = '10', offset = '0' } = req.query;

        const limiteNum = parseInt(limite as string, 10);
        const offsetNum = parseInt(offset as string, 10);

        if (isNaN(limiteNum) || limiteNum <= 0) {
            res.status(400).json({ error: "El parámetro 'limite' debe ser un número positivo." });
            return;
        }

        if (isNaN(offsetNum) || offsetNum < 0) {
            res.status(400).json({ error: "El parámetro 'offset' debe ser un número igual o mayor a 0." });
            return;
        }

        try {
            const reservaciones = await ReservacionDAO.paginarReservaciones(limiteNum, offsetNum);
            if (reservaciones.length === 0) {
                res.status(404).json({ mensaje: "No se encontraron reservaciones." });
                return;
            }
            res.status(200).json(reservaciones);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }


    public async crearReservacion(req: Request, res: Response): Promise<void> {
        try {
            const { precio, idPersona, idFuncion } = req.body;
            if (!precio || !idPersona || !idFuncion) {
                res.status(400).json({ error: "Faltan parámetros en la solicitud." });
                return;
            }
            const reservacion: Reservacion = new Reservacion(0, precio, idPersona, idFuncion);
            const idReservacion = await ReservacionDAO.crearReservacion(reservacion);
            if (idReservacion === null) {
                res.status(409).json({ error: "La persona ya tiene una reserva para esta función." });
            } else {
                res.status(201).json({ mensaje: "Reservación creada con éxito", data: idReservacion });
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async obtenerTodasReservaciones(req: Request, res: Response): Promise<void> {
        try {
            const todasReservaciones = await ReservacionDAO.obtenerTodasReservaciones();
            res.status(200).json(todasReservaciones);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async obtenerReservacionPorID(req: Request, res: Response): Promise<void> {
        const idReservacion = req.params.idReservacion;

        if (isNaN(Number(idReservacion))) {
            res.status(400).json({ error: "El ID de la reservación debe ser un número válido." });
            return;
        }

        try {
            const reservacion = await ReservacionDAO.obtenerReservacionPorID(Number(idReservacion));
            if (reservacion) {
                res.status(200).json({ data: reservacion });
            } else {
                res.status(404).json({ error: "Reservación no encontrada." });
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async actualizarReservacion(req: Request, res: Response): Promise<void> {
        const { precio, idPersona, idFuncion } = req.body;

        if (!precio || !idPersona || !idFuncion) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }

        const reservacion: Reservacion = new Reservacion(0, precio, idPersona, idFuncion);

        try {
            const resultado = await ReservacionDAO.actualizarReservacion(reservacion);
            res.status(resultado.status).json({ mensaje: resultado.message });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Controlador para actualizar el precio de todas las reservas para una función
    public async actualizarPrecioPorFuncion(req: Request, res: Response): Promise<void> {
        const { precio, idFuncion } = req.body;

        if (!precio || !idFuncion) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }

        try {
            await ReservacionDAO.actualizarPrecioPorFuncion(precio, idFuncion);
            res.status(200).json({ mensaje: `Precio actualizado para todas las reservas de la función ${idFuncion}` });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Controlador para actualizar el precio de todas las reservas para una persona
    public async actualizarPrecioPorPersona(req: Request, res: Response): Promise<void> {
        const { precio, idPersona } = req.body;

        if (!precio || !idPersona) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }

        try {
            await ReservacionDAO.actualizarPrecioPorPersona(precio, idPersona);
            res.status(200).json({ mensaje: `Precio actualizado para todas las reservas de la persona ${idPersona}` });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async eliminarReservacion(req: Request, res: Response): Promise<void> {
        const { idPersona, idFuncion } = req.body;

        if (!idPersona || !idFuncion) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }

        try {
            await ReservacionDAO.eliminarReservacion(idPersona, idFuncion);
            res.status(200).json({ mensaje: "Reservación eliminada con éxito" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async contarReservasPorFuncion(req: Request, res: Response): Promise<void> {
        const { idFuncion } = req.params;

        if (isNaN(Number(idFuncion))) {
            res.status(400).json({ error: "El ID de la función debe ser un número válido." });
            return;
        }

        try {
            const cantidad = await ReservacionDAO.contarReservasPorFuncion(Number(idFuncion));
            res.status(200).json({ cantidad });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async obtenerSillasPorReservacion(req: Request, res: Response): Promise<void> {
        const { idReservacion } = req.params;

        if (isNaN(Number(idReservacion))) {
            res.status(400).json({ error: "El ID de la reservación debe ser un número válido." });
            return;
        }

        try {
            const sillas = await ReservacionDAO.obtenerSillasPorReservacion(Number(idReservacion));
            res.status(200).json(sillas);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async agregarSillasAReservacion(req: Request, res: Response): Promise<void> {
        const { idReservacion, idSilla, estado } = req.body;

        if (!idSilla || !idReservacion || !estado) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }
        if (isNaN(Number(idSilla)) || isNaN(Number(idReservacion))) {
            res.status(400).json({ error: "Los parámetros deben ser números válidos." });
            return;
        }

        try {
            await ReservacionDAO.agregarSillasAReservacion(idReservacion, idSilla, estado);
            res.status(200).json({ mensaje: "Silla agregada a la reservación con éxito" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async eliminarSillasDeReservacion(req: Request, res: Response): Promise<void> {
        const { idSilla, idReservacion } = req.params;

        if (isNaN(Number(idReservacion)) || isNaN(Number(idSilla))) {
            res.status(400).json({ error: "El ID de la reservación e ID de la silla debe ser un número válido." });
            return;
        }

        try {
            await ReservacionDAO.eliminarSillasDeReservacion(Number(idSilla), Number(idReservacion));
            res.status(200).json({ mensaje: "Sillas eliminadas de la reservación con éxito" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async agregarProductoAReservacion(req: Request, res: Response): Promise<void> {
        const { idProducto, idReservacion, precioPedido, cantidad } = req.body;

        if (!idProducto || !idReservacion || !precioPedido || !cantidad) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }
        if (isNaN(Number(idProducto)) || isNaN(Number(idReservacion)) || isNaN(Number(precioPedido)) || isNaN(Number(cantidad))) {
            res.status(400).json({ error: "Los parámetros deben ser números válidos." });
            return;
        }

        try {
            await ReservacionDAO.agregarProductoAReservacion(idProducto, idReservacion, precioPedido, cantidad);
            res.status(200).json({ mensaje: "Producto agregado a la reservación con éxito" });
        } catch (error: any) {
            console.error("Error al agregar producto a la reservación:", error);
            res.status(400).json({ error: error.message || "Error interno del servidor" });
        }
    }


    public async obtenerProductosPorReservacion(req: Request, res: Response): Promise<void> {
        const { idReservacion } = req.params;

        if (isNaN(Number(idReservacion))) {
            res.status(400).json({ error: "El ID de la reservación debe ser un número válido." });
            return;
        }

        try {
            const productos = await ReservacionDAO.obtenerProductosPorReservacion(Number(idReservacion));
            res.status(200).json(productos);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async eliminarProductoDeReservacion(req: Request, res: Response): Promise<void> {
        const { idReservacion, idProducto } = req.params;

        if (isNaN(Number(idReservacion)) || isNaN(Number(idProducto))) {
            res.status(400).json({ error: "Los IDs de la reservación y del producto deben ser números válidos." });
            return;
        }

        try {
            await ReservacionDAO.eliminarProductoDeReservacion(Number(idReservacion), Number(idProducto));
            res.status(200).json({ mensaje: "Producto eliminado de la reservación con éxito" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async actualizarTodosLosPrecios(req: Request, res: Response): Promise<void> {
        const precio = Number(req.params.precio);

        if (isNaN(precio)) {
            res.status(400).json({ error: "El precio debe ser un numero valido" });
        }

        if (precio < 0) {
            res.status(400).json({ error: "El precio debe ser un valor positivo" })
        }
        try {
            await ReservacionDAO.actualizarTodosLosPrecios(precio);
            res.status(200).json({ mensaje: "Precio actualizado para todos los productos correctamente" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async eliminarReservasPorFuncion(req: Request, res: Response): Promise<any> {
        const idFuncion = Number(req.params.idFuncion);

        if (isNaN(idFuncion)) {
            return res.status(400).json({ error: "El ID debe ser un número válido" });
        }

        try {
            const { resultados, errores } = await ReservacionDAO.eliminarReservasPorFuncion(idFuncion);

            if (errores.length > 0) {
                return res.status(207).json({ mensaje: "Se procesaron las reservas, pero ocurrieron algunos errores", resultados, errores });
            }

            return res.status(200).json({ mensaje: "Reservas eliminadas correctamente", resultados });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

}
const reservacionControlador = new ReservacionControlador();
export default reservacionControlador;