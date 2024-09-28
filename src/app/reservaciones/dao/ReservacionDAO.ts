import { Response } from "express";
import { SQL_RESERVACIONES } from "../repository/sql_reservacion";
import pool from "../../../config/connection/dbConnection";

class ReservacionDAO {
    // Paginación de reservaciones
  public static async paginarReservaciones(limite: number, offset: number): Promise<any[]> {
    try {
      const reservaciones = await pool.any(SQL_RESERVACIONES.PAGINATE_RESERVACIONES, [limite, offset]);
      return reservaciones;
    } catch (error) {
      throw new Error(`Error paginando reservaciones: ${error}`);
    }
  }

  // Método para crear una nueva reservación
  public static async crearReservacion(precio: number, id_persona: number, id_funcion: number): Promise<number | null> {
    try {
      // Verificar si la reservación ya existe
      const exists = await pool.oneOrNone(SQL_RESERVACIONES.CHECK_IF_EXISTS, [id_persona, id_funcion]);
      if (exists) {
        throw new Error("La persona ya tiene una reserva para esta función.");
      }

      // Insertar la nueva reservación
      const nuevaReservacion = await pool.one(SQL_RESERVACIONES.ADD, [precio, id_persona, id_funcion]);
      
      // Devolver el id de la nueva reservación
      return nuevaReservacion.id_reservacion;

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

  public static async obtenerReservacionPorID(id_reservacion: number): Promise<any | null> {
    try {
      const reservacion = await pool.oneOrNone(SQL_RESERVACIONES.GET_BY_ID, [id_reservacion]);
      return reservacion;
    } catch (error) {
      throw new Error(`Error al obtener la reserva con ID ${id_reservacion}: ${error}`);
    }
  }

  public static async actualizarReservacion(datos: { precio: number, id_persona: number, id_funcion: number, id_reservacion: number }): Promise<any> {
    try {
      // Verificar si la persona ya tiene una reserva para la misma función
      const exists = await pool.oneOrNone(SQL_RESERVACIONES.CHECK_IF_EXISTS, [datos.id_persona, datos.id_funcion]);
      
      if (exists && exists.id_reservacion !== datos.id_reservacion) {
        throw new Error("La persona ya tiene una reserva para esta función.");
      }
  
      // Actualizar la reserva
      await pool.none(SQL_RESERVACIONES.UPDATE, [datos.precio, datos.id_persona, datos.id_funcion, datos.id_reservacion]);
  
      return { mensaje: "Reservación actualizada con éxito" };
    } catch (error) {
      throw new Error(`Error al actualizar la reserva: ${error}`);
    }
  }  
  

  // Actualizar precio de todas las reservas para una función
  public static async actualizarPrecioPorFuncion(precio: number, id_funcion: number): Promise<void> {
    try {
      await pool.none(SQL_RESERVACIONES.UPDATE_PRECIO_FUNCION, [precio, id_funcion]);
    } catch (error) {
      throw new Error(`Error actualizando el precio para la función ${id_funcion}: ${error}`);
    }
  }

  // Actualizar precio de todas las reservas para una persona
  public static async actualizarPrecioPorPersona(precio: number, id_persona: number): Promise<void> {
    try {
      await pool.none(SQL_RESERVACIONES.UPDATE_PRECIO_PERSONA, [precio, id_persona]);
    } catch (error) {
      throw new Error(`Error actualizando el precio para la persona ${id_persona}: ${error}`);
    }
  }

  public static async eliminarReservacion(id_reservacion: number): Promise<any> {
    try {
      // Eliminar la reserva por ID
      await pool.none(SQL_RESERVACIONES.DELETE, [id_reservacion]);
  
      return { mensaje: "Reservación eliminada con éxito" };
    } catch (error) {
      throw new Error(`Error al eliminar la reserva: ${error}`);
    }
  }

  public static async contarReservasPorFuncion(id_funcion: number): Promise<number> {
    try {
      // Realiza la consulta para contar las reservas para una función específica
      const { cantidad } = await pool.one(SQL_RESERVACIONES.COUNT_BY_FUNCION, [id_funcion]);
  
      return cantidad;
    } catch (error) {
      throw new Error(`Error al contar las reservas para la función: ${error}`);
    }
  }
    
  public static async obtenerSillasPorReservacion(id_reservacion: number): Promise<any[]> {
    try {
      // Realiza la consulta para obtener las sillas asociadas a una reserva
      const sillas = await pool.any(SQL_RESERVACIONES.GET_SILLAS_BY_RESERVACION, [id_reservacion]);
  
      return sillas;
    } catch (error) {
      throw new Error(`Error al obtener las sillas reservadas: ${error}`);
    }
  }

  public static async agregarSillasAReservacion(id_silla: number, id_reservacion: number, estado: string): Promise<void> {
    try {
      // Realiza la consulta para agregar una silla a la reservación
      await pool.none(SQL_RESERVACIONES.ADD_SILLAS_TO_RESERVACION, [id_silla, id_reservacion, estado]);
    } catch (error) {
      throw new Error(`Error al agregar la silla a la reservación: ${error}`);
    }
  }

  public static async eliminarSillasDeReservacion<T extends number | string>(id_reservacion: T): Promise<void> {
    try {
      // Realiza la consulta para eliminar todas las sillas de la reservación
      await pool.none(SQL_RESERVACIONES.DELETE_SILLAS_FROM_RESERVACION, [id_reservacion]);
    } catch (error) {
      throw new Error(`Error al eliminar las sillas de la reservación: ${error}`);
    }
  }

  public static async agregarProductoAReservacion(
    id_pedido: string,
    id_producto: number,
    id_reservacion: number,
    precio_pedido: number
  ): Promise<void> {
    try {
      // Realiza la consulta para agregar un producto a la reservación
      await pool.none(SQL_RESERVACIONES.ADD_PRODUCTO_TO_RESERVACION, [
        id_pedido,
        id_producto,
        id_reservacion,
        precio_pedido
      ]);
    } catch (error) {
      throw new Error(`Error al agregar el producto a la reservación: ${error}`);
    }
  }
  
  public static async obtenerProductosPorReservacion(id_reservacion: number): Promise<any[]> {
    try {
      // Realiza la consulta para obtener los productos de la reservación
      const productos = await pool.manyOrNone(SQL_RESERVACIONES.GET_PRODUCTOS_BY_RESERVACION, [
        id_reservacion
      ]);
      return productos;
    } catch (error) {
      throw new Error(`Error al obtener productos de la reservación: ${error}`);
    }
  }

  public static async eliminarProductoDeReservacion(id_reservacion: number, id_producto: number): Promise<void> {
    try {
      // Realiza la consulta para eliminar el producto de la reservación
      await pool.none(SQL_RESERVACIONES.DELETE_PRODUCTO_FROM_RESERVACION, [
        id_reservacion,
        id_producto
      ]);
    } catch (error) {
      throw new Error(`Error al eliminar el producto de la reservación: ${error}`);
    }
  }  

}
export default ReservacionDAO;
