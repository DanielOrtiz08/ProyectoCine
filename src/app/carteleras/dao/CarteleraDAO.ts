import { Response } from "express";
import { SQL_CARTELERAS } from "../repository/sql_cartelera";
import pool from "../../../config/connection/dbConnection";
import Cartelera from "../entity/Cartelera";

class CarteleraDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_CARTELERAS.GET_ALL, params).then((resultado) => {
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log(miError);
            res.status(400).json({
                "Respuesta": "ay no sirve"
            });
        });
    }

    protected static async grabeloYa(datos: Cartelera, res: Response): Promise<any> {
        await pool
        .task(async (consulta) => {
            let queHacer =1;
            let respuBase: any;
            //const cubi = await consulta.one(SQL_CARTELERAS.HOW_MANY, [datos.]);
            //if(cubi.existe ==0) {
                queHacer =2;
                respuBase = await consulta.one(SQL_CARTELERAS.ADD, [datos.idPelicula, datos.idCine, datos.fechaInicioCartelera, datos.fechaFinCartelera]);
            //}
            return { queHacer, respuBase };
        })
        .then(({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "Compita ya existe la sala" });
                    break;
                default:
                    res.status(200).json(respuBase);
                    break;
            }
        })
        .catch((miError:any) => {
            console.log(miError);
            res.status(400).json({ respuesta: "Se totió mano"});
        });
    }

    protected static async borreloYa(datos: Cartelera, res: Response): Promise<any> {
        pool
          .task((consulta) => {
            return consulta.result(SQL_CARTELERAS.DELETE, [datos.idPelicula, datos.idCine]);
          })
          .then((respuesta) => {
            res.status(200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount,
            });
          })
          .catch((miErrorcito) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Pailas, sql totiado" });
          });
    }

    protected static async actualiceloYa(datos: Cartelera, res: Response): Promise<any> {
      pool
        .task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_CARTELERAS.HOW_MANY, [datos.idPelicula, datos.idCine]);
            if(cubi.existe != 0) {
                queHacer = 2;
                await consulta.none(SQL_CARTELERAS.UPDATE, [datos.idPelicula, datos.idCine, datos.fechaInicioCartelera, datos.fechaFinCartelera]);
            }
            return { queHacer, respuBase };
        })
        .then(({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "Compita no existe" });
                    break;
                default:
                    res.status(200).json({ actualizado: "ok" });
                    break;
            }
        })
        .catch((miErrorcito) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Pailas, sql totiado" });
        });
    }

    protected static async obtenerPaginado(limite: number, offset: number, res: Response): Promise<any> {
        await pool.result(SQL_CARTELERAS.GET_PAGINATED, [limite, offset])
            .then((resultado) => {
                res.status(200).json({
                    total: resultado.rowCount,
                    carteleras: resultado.rows
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(400).json({
                    "respuesta": "Error al realizar la consulta paginada"
                });
            });
    }
    
    
}
export default CarteleraDAO;