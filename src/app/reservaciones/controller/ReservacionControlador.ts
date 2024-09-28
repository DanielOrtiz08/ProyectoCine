import { Response, Request } from "express";
import ReservacionDAO from "../dao/ReservacionDAO";
import Reservacion from "../entity/Reservacion";

class ReservacionControlador extends ReservacionDAO {

    // Controlador para la paginación de reservaciones
    public async paginarReservaciones(req: Request, res: Response): Promise<void> {
        // Desestructuración para obtener los valores de limite y offset
        const { limite = '10', offset = '0' } = req.query;
    
        // Convertir a números y validar
        const limiteNum = parseInt(limite as string, 10);
        const offsetNum = parseInt(offset as string, 10);
    
        // Validar los parámetros
        if (isNaN(limiteNum) || limiteNum <= 0) {
            res.status(400).json({ 
                error: "El parámetro 'limite' debe ser un número positivo.", 
                recibido: limite 
            });
            return;
        }
    
        if (isNaN(offsetNum) || offsetNum < 0) {
            res.status(400).json({ 
                error: "El parámetro 'offset' debe ser un número igual o mayor a 0.", 
                recibido: offset 
            });
            return;
        }
    
        try {
            // Llamar al método del DAO para la paginación
            const reservaciones = await ReservacionDAO.paginarReservaciones(limiteNum, offsetNum);
            res.status(200).json(reservaciones);
        } catch (error) {
            res.status(500).json({ error: `Error al paginar las reservaciones: ${error}` });
        }
    }
    

    public async crearReservacion(req: Request, res: Response): Promise<void> {
        const { precio, idPersona, idFuncion } = req.body;
        if (!precio || !idPersona || !idFuncion) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }
        const reservacion: Reservacion = new Reservacion(0, precio, idPersona, idFuncion);

        await ReservacionDAO.crearReservacion(reservacion, res);
    }

    public async obtenerTodasReservaciones(req: Request, res: Response): Promise<void> {
        try {
            const todasReservaciones = await ReservacionDAO.obtenerTodasReservaciones(res);
            res.status(200).json(todasReservaciones);
        } catch (error) {
            res.status(500).json({ error: `Error al obtener todas las reservas: ${error}` });
        }
    }

    public async obtenerReservacionPorID(req: Request, res: Response): Promise<void> {
        const { idReservacion } = req.params;

        // Validar que idReservacion sea un número
        if (isNaN(Number(idReservacion))) {
            res.status(400).json({ error: "El ID de la reservación debe ser un número válido." });
            return;
        }

        try {
            const reservacion = await ReservacionDAO.obtenerReservacionPorID(Number(idReservacion), res);
            if (reservacion) {
                res.status(200).json(reservacion);
            } else {
                res.status(404).json({ error: "Reservación no encontrada." });
            }
        } catch (error) {
            res.status(500).json({ error: `Error al obtener la reservación: ${error}` });
        }
    }

    public async actualizarReservacion(req: Request, res: Response): Promise<void> {
        const { precio, idPersona, idFuncion } = req.body;

        // Validar que los parámetros estén presentes
        if (!precio || !idPersona || !idFuncion) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }

        const reservacion: Reservacion = new Reservacion(0, precio, idPersona, idFuncion);

        try {
            const resultado = await ReservacionDAO.actualizarReservacion(reservacion, res);
            res.status(resultado.status).json({ mensaje: resultado.message });
        } catch (error) {
            res.status(500).json({ error: `Error al actualizar la reservación: ${error}` });
        }
    }

    // Controlador para actualizar el precio de todas las reservas para una función
    public async actualizarPrecioPorFuncion(req: Request, res: Response): Promise<void> {
        const { precio, idFuncion } = req.body;

        // Validar parámetros
        if (!precio || !idFuncion) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }

        try {
            await ReservacionDAO.actualizarPrecioPorFuncion(precio, idFuncion);
            res.status(200).json({ mensaje: `Precio actualizado para todas las reservas de la función ${idFuncion}` });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // Controlador para actualizar el precio de todas las reservas para una persona
    public async actualizarPrecioPorPersona(req: Request, res: Response): Promise<void> {
        const { precio, idPersona } = req.body;

        // Validar parámetros
        if (!precio || !idPersona) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }

        try {
            await ReservacionDAO.actualizarPrecioPorPersona(precio, idPersona);
            res.status(200).json({ mensaje: `Precio actualizado para todas las reservas de la persona ${idPersona}` });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    public async eliminarReservacion(req: Request, res: Response): Promise<void> {
        const { idPersona, idFuncion } = req.body;

        // Validar que los parámetros estén presentes
        if (!idPersona || !idFuncion) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }

        try {
            await ReservacionDAO.eliminarReservacion(idPersona, idFuncion);
            res.status(200).json({ mensaje: "Reservación eliminada con éxito" });
        } catch (error) {
            res.status(500).json({ error: `Error al eliminar la reservación: ${error}` });
        }
    }

    public async contarReservasPorFuncion(req: Request, res: Response): Promise<void> {
        const { idFuncion } = req.params;

        // Validar que el parámetro idFuncion sea un número
        if (isNaN(Number(idFuncion))) {
            res.status(400).json({ error: "El ID de la función debe ser un número válido." });
            return;
        }

        try {
            const cantidad = await ReservacionDAO.contarReservasPorFuncion(Number(idFuncion));
            res.status(200).json({ cantidad });
        } catch (error) {
            res.status(500).json({ error: `Error al contar las reservas: ${error}` });
        }
    }

    public async obtenerSillasPorReservacion(req: Request, res: Response): Promise<void> {
        const { idReservacion } = req.params;

        // Validar que el parámetro idReservacion sea un número
        if (isNaN(Number(idReservacion))) {
            res.status(400).json({ error: "El ID de la reservación debe ser un número válido." });
            return;
        }

        try {
            const sillas = await ReservacionDAO.obtenerSillasPorReservacion(Number(idReservacion));
            res.status(200).json(sillas);
        } catch (error) {
            res.status(500).json({ error: `Error al obtener las sillas: ${error}` });
        }
    }

    public async agregarSillasAReservacion(req: Request, res: Response): Promise<void> {
        const { idSilla, idReservacion, estado } = req.body;

        // Validar que los parámetros estén presentes
        if (!idSilla || !idReservacion || !estado) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }

        try {
            await ReservacionDAO.agregarSillasAReservacion(idSilla, idReservacion, estado);
            res.status(200).json({ mensaje: "Silla agregada a la reservación con éxito" });
        } catch (error) {
            res.status(500).json({ error: `Error al agregar la silla a la reservación: ${error}` });
        }
    }

    public async eliminarSillasDeReservacion(req: Request, res: Response): Promise<void> {
        const { idReservacion } = req.params;

        // Validar que el parámetro idReservacion sea un número
        if (isNaN(Number(idReservacion))) {
            res.status(400).json({ error: "El ID de la reservación debe ser un número válido." });
            return;
        }

        try {
            await ReservacionDAO.eliminarSillasDeReservacion(Number(idReservacion));
            res.status(200).json({ mensaje: "Sillas eliminadas de la reservación con éxito" });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    public async agregarProductoAReservacion(req: Request, res: Response): Promise<void> {
        const { id_producto, id_reservacion, precio_pedido } = req.body;

        // Validar que los parámetros estén presentes
        if (!id_producto || !id_reservacion || !precio_pedido) {
            res.status(400).json({ error: "Faltan parámetros en la solicitud." });
            return;
        }

        try {
            await ReservacionDAO.agregarProductoAReservacion(id_producto, id_reservacion, precio_pedido);
            res.status(200).json({ mensaje: "Producto agregado a la reservación con éxito" });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }


}
const reservacionControlador = new ReservacionControlador();
export default reservacionControlador;