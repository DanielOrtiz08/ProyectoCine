import { Response } from "express";
import { SQL_SALAS } from "../repository/sql_sala";
import pool from "../../../config/connection/dbConnection";
import Sala from "../entity/Sala";

class SalaDAO {
    // Paginación de salas
    public static async paginarSalas(limite: number, offset: number): Promise<any[]> {
        try {
            const salas = await pool.any(SQL_SALAS.PAGINATE_SALAS, [limite, offset]);
            return salas;
        } catch (error) {
        throw new Error(`Error paginando salas: ${error}`);
        }
    }

    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_SALAS.GET_ALL, params)
        .then((resultado) => {
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log(miError);
            res.status(400).json({
                "Respuesta": "ay no sirve"
            });
        });
    }

    protected static async grabeloYa(datos: Sala, res: Response): Promise<any> {
        await pool
        .task(async (consulta) => {
            const salasEncontradas = await consulta.one(SQL_SALAS.HOW_MANY, [datos.formatoSala, datos.capacidadSala, datos.idCine]);
            if(salasEncontradas.cantidad == 0) {
                let respuBase = await consulta.one(SQL_SALAS.ADD, [datos.formatoSala, datos.capacidadSala, datos.idCine]);
                return { existe: false, respuBase};
            }
            return { existe: true };
        })
        .then(({ existe, respuBase }) => {
            if(existe) {
                res.status(400).json({ respuesta: "Compita ya existe la sala" });
            }else {
                res.status(200).json(respuBase);
            }
        })
        .catch((miError:any) => {
            console.log(miError);
            res.status(400).json({ respuesta: "Se totió mano"});
        });
    }

    protected static async borreloYa(datos: Sala, res: Response): Promise<any> {
        pool
          .task((consulta) => {
            return consulta.result(SQL_SALAS.DELETE, [datos.idSala]);
          })
          .then((respuesta) => {
            res.status(200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount
            });
          })
          .catch((miErrorcito) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Pailas, sql totiado" });
          });
    }

    protected static async actualiceloYa(datos: Sala, res: Response): Promise<any> {
      pool
        .task(async (consulta) => {
            const salasEncontradas = await consulta.one(SQL_SALAS.HOW_MANY, [datos.formatoSala, datos.capacidadSala, datos.idCine]);
            if(salasEncontradas.cantidad == 0) {
                return { existe: false}
            }
            await consulta.none(SQL_SALAS.UPDATE, [datos.idSala, datos.formatoSala, datos.capacidadSala, datos.idCine]);
            return { existe: true };
        })
        .then(({ existe }) => {
            if(existe) {
                res.status(200).json({ actualizado: "ok" });
            } else {
                res.status(400).json({ respuesta: "Compita no existe" });

            }
        })
        .catch((miErrorcito) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Pailas, sql totiado" });
        });
    }
}
export default SalaDAO; 