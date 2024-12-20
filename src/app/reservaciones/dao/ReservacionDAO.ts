import { Response } from "express";
import { SQL_RESERVACIONES } from "../repository/sql_reservacion";
import pool from "../../../config/connection/dbConnection";
import Reservacion from "../entity/Reservacion";

class ReservacionDAO {
  // Paginación de reservaciones
  public static async paginarReservaciones(limite: number, offset: number): Promise<any[]> {
    try {
      const reservaciones: Reservacion[] = await pool.any(SQL_RESERVACIONES.PAGINATE_RESERVACIONES, [limite, offset]);
      return reservaciones;
    } catch (error) {
      throw new Error(`Error paginando reservaciones: ${error}`);
    }
  }

  // Método para crear una nueva reservación
  public static async crearReservacion(reservacion: Reservacion): Promise<number | null> {
    try {
        const existe = await pool.oneOrNone(SQL_RESERVACIONES.CHECK_IF_EXISTS, [reservacion.idPersona, reservacion.idFuncion]);

        // Asegúrate de manejar correctamente el caso donde no hay resultado
        const cantidad = existe ? parseInt(existe.cantidad, 10) : 0;
        if (cantidad > 0) {
            return null; // Ya existe una reserva
        }

        // Inserta la nueva reservación y retorna el ID generado
        const nuevaReservacion = await pool.one(SQL_RESERVACIONES.ADD, [reservacion.precio, reservacion.idPersona, reservacion.idFuncion]);

        return nuevaReservacion.idReservacion;

    } catch (error) {
        throw new Error(`Error al crear la reserva: ${error}`);
    }
}


  public static async obtenerTodasReservaciones(): Promise<any[]> {
    try {
      const todasReservaciones = await pool.manyOrNone(SQL_RESERVACIONES.GET_ALL);
      return todasReservaciones;
    } catch (error) {
      throw new Error(`Error al obtener todas las reservas: ${error}`);
    }
  }

  public static async obtenerReservacionPorID(idReservacion: number): Promise<any | null> {
    try {
      const reservacion = await pool.oneOrNone(SQL_RESERVACIONES.GET_BY_ID, [idReservacion]);
      return reservacion;
    } catch (error) {
      throw new Error(`Error al obtener la reserva con ID ${idReservacion}: ${error}`);
    }
  }

  public static async actualizarReservacion(reservacion: Reservacion): Promise<any> {
    try {
      const existe = await pool.oneOrNone(SQL_RESERVACIONES.CHECK_IF_EXISTS, [reservacion.idPersona, reservacion.idFuncion]);

      if (existe.cantidad == 0) {
        return { status: 200, message: "No existe la reservación" };
      }
      await pool.none(SQL_RESERVACIONES.UPDATE, [reservacion.precio, reservacion.idPersona, reservacion.idFuncion]);
      return { status: 200, message: "Reservación actualizada con éxito" };
    } catch (error) {
      throw new Error(`Error al actualizar la reserva: ${error}`);
    }
  }


  // Actualizar precio de todas las reservas para una función
  public static async actualizarPrecioPorFuncion(precio: number, idFuncion: number): Promise<void> {
    try {
      await pool.none(SQL_RESERVACIONES.UPDATE_PRECIO_FUNCION, [precio, idFuncion]);
    } catch (error) {
      throw new Error(`Error actualizando el precio para la función ${idFuncion}: ${error}`);
    }
  }

  // Actualizar precio de todas las reservas para una persona
  public static async actualizarPrecioPorPersona(precio: number, idPersona: number): Promise<void> {
    try {
      await pool.none(SQL_RESERVACIONES.UPDATE_PRECIO_PERSONA, [precio, idPersona]);
    } catch (error) {
      throw new Error(`Error actualizando el precio para la persona ${idPersona}: ${error}`);
    }
  }

  public static async eliminarReservacion(idPersona: number, idFuncion: number): Promise<void> {
    try {
      await pool.none(SQL_RESERVACIONES.DELETE_BY_PERSONA_AND_FUNCTION, [idPersona, idFuncion]);
    } catch (error) {
      throw new Error(`Error al eliminar la reserva: ${error}`);
    }
  }

  public static async contarReservasPorFuncion(idFuncion: number): Promise<number> {
    try {
      const { cantidad } = await pool.one(SQL_RESERVACIONES.COUNT_BY_FUNCION, [idFuncion]);
      return cantidad;
    } catch (error) {
      throw new Error(`Error al contar las reservas para la función: ${error}`);
    }
  }

  public static async contarReservasPorPersona(idPersona: number, response: Response): Promise<number> {
    try {
      const { cantidad } = await pool.one(SQL_RESERVACIONES.COUNT_BY_PERSONA, [idPersona]);

      return cantidad;
    } catch (error) {
      response.status(400);
      throw new Error(`Error al contar las reservas para la función: ${error}`);
    }
  }

  public static async obtenerSillasPorReservacion(idReservacion: number): Promise<any[]> {
    try {
      const sillas = await pool.any(SQL_RESERVACIONES.GET_SILLAS_BY_RESERVACION, [idReservacion]);
      return sillas;
    } catch (error) {
      throw new Error(`Error al obtener las sillas reservadas: ${error}`);
    }
  }

  public static async agregarSillasAReservacion(idReservacion: number, idSilla: number, estado: string): Promise<void> {
    try {
      await pool.none(SQL_RESERVACIONES.ADD_SILLAS_TO_RESERVACION, [idReservacion, idSilla, estado]);
    } catch (error) {
      throw new Error(`Error al agregar la silla a la reservación: ${error}`);
    }
  }

  public static async eliminarSillasDeReservacion(idSilla: number, idReservacion: number): Promise<void> {
    try {
      await pool.none(SQL_RESERVACIONES.DELETE_SILLAS_FROM_RESERVACION, [idSilla, idReservacion]);
    } catch (error) {
      throw new Error(`Error al eliminar las sillas de la reservación: ${error}`);
    }
  }

  public static async agregarProductoAReservacion(idProducto: number, idReservacion: number, precioPedido: number, cantidad: number): Promise<void> {
    try {
      await pool.none(SQL_RESERVACIONES.ADD_PRODUCTO_TO_RESERVACION, [idProducto, idReservacion, precioPedido, cantidad]);
    } catch (error) {
      throw new Error(`Error al agregar el producto a la reservación: ${error}`);
    }
  }

  public static async obtenerProductosPorReservacion(id_reservacion: number): Promise<any[]> {
    try {
      const productos = await pool.manyOrNone(SQL_RESERVACIONES.GET_PRODUCTOS_BY_RESERVACION, [id_reservacion]);
      return productos;
    } catch (error) {
      throw new Error(`Error al obtener productos de la reservación: ${error}`);
    }
  }

  public static async eliminarProductoDeReservacion(id_reservacion: number, id_producto: number): Promise<void> {
    try {
      await pool.none(SQL_RESERVACIONES.DELETE_PRODUCTO_FROM_RESERVACION, [id_reservacion, id_producto]);
    } catch (error) {
      throw new Error(`Error al eliminar el producto de la reservación: ${error}`);
    }
  }

  public static async actualizarTodosLosPrecios(precio: number): Promise<void> {
    try {
      await pool.none(SQL_RESERVACIONES.UPDATE_PRICE, [precio]);
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error}`);
    }
  }


  public static async eliminarReservasPorFuncion(idFuncion: number): Promise<any> {
    const resultados = [];
    const salidas = [];
    try {
      const reservas: any[] = await pool.manyOrNone(SQL_RESERVACIONES.SELECT_RESEVATIONS_BY_FUNCTION, [idFuncion]);
      if (reservas.length == 0) {
        throw new Error("No se encontró ninguna reservacion asociada a la función");
      }

      for (const reserva of reservas) {
        try {
          let existe = await pool.one(SQL_RESERVACIONES.CHECK_IF_HAS_CHAIRS, [reserva.idReservacion]);
          resultados.push({ idReservacion: reserva.idReservacion, referenciasEnSillas: existe.cantidad });

          if (existe.cantidad == 0) {
            existe = await pool.one(SQL_RESERVACIONES.CHECK_IF_HAS_PRODUCTS, [reserva.idReservacion]);
          }
          resultados.push({ idReservacion: reserva.idReservacion, referenciasEnProductos: existe.cantidad });

          if (existe.cantidad > 0) {
            throw new Error(`La reservación ${reserva.idReservacion} ya está referenciada en otra tabla`);
          } else {
            await pool.none(SQL_RESERVACIONES.DELETE, [reserva.idReservacion]);
            salidas.push(`Reserva ${reserva.idReservacion} eliminada correctamenta`);
          }
        } catch (innerError: any) {
          salidas.push(` ${innerError.message}`);
        }
      }

      return { resultados, salidas };
    } catch (error: any) {
      throw new Error(`Error al intentar eliminar las reservas de la función ${idFuncion}: ${error.message}`);
    }
  }

}



export default ReservacionDAO;
