import { Response } from "express";
import { SQL_PERSONAS } from "../repository/sql_personas";
import pool from "../../../config/connection/dbConnection";
import Persona from "../entity/Persona";

class PersonaDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool
            .result(SQL_PERSONAS.GET_ALL, params)
            .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
            .catch((miError) => {
                console.log(miError);
                res.status(400).json({
                    Respuesta: "ay no sirve, error en obtenerTodo",
                });
            });
    }

    protected static async grabeloYa(
        datos: Persona,
        res: Response
    ): Promise<any> {
        // hace insert
        await pool
            .task(async (consulta) => {
                let queHacer = 1;
                let respuBase: any;
                const cubi = await consulta.one(SQL_PERSONAS.HOW_MANY, [
                    datos.numeroDocumento
                ]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = await consulta.one(SQL_PERSONAS.ADD, [
                        datos.numeroDocumento,
                        datos.nombresPersona,
                        datos.apellidosPersona,
                        datos.fechaNacimientoPersona,
                        datos.idCargo,
                        datos.idUbicacion,
                        datos.idPlan,
                        datos.celular,
                        datos.emailPersona,
                        datos.contraseniaPersona,
                    ]);
                }
                return { queHacer, respuBase };
            })
            .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res
                            .status(400)
                            .json({
                                respuesta: "Compita ya existes en nuestra base de datos",
                            });
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            })
            .catch((miError: any) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Se totió mano" });
            });
    }

    protected static async borreloYa(
        datos: Persona,
        res: Response
    ): Promise<any> {
        // borra dado un id
        pool
            .task((consulta) => {
                return consulta.result(SQL_PERSONAS.DELETE, [datos.numeroDocumento]);
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

    protected static async actualiceloYa(
        datos: Persona,
        res: Response
    ): Promise<any> {
        // actualiza dado un id
        pool
            .task(async (consulta) => {
                let queHacer = 1;
                let respuBase: any;
                const cubi = await consulta.one(SQL_PERSONAS.HOW_MANY, [
                    datos.numeroDocumento
                ]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = await consulta.none(SQL_PERSONAS.UPDATE, [
                        datos.numeroDocumento,
                        datos.nombresPersona,
                        datos.apellidosPersona,
                        datos.fechaNacimientoPersona,
                        datos.idCargo,
                        datos.idUbicacion,
                        datos.idPlan,
                        datos.celular,
                        datos.emailPersona,
                        datos.contraseniaPersona,
                    ]);
                }
                return { queHacer, respuBase };
            })
            .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res
                            .status(400)
                            .json({
                                respuesta: "Compita no existes en nuestra base de datos",
                            });
                        break;
                    case 2:
                        res.status(200).json({ actualizado: "ok" });
                        break;
                    default:
                        res
                            .status(200)
                            .json({ respuesta: "Algo salio mal al momento de actualizar" });
                        break;
                }
            })
            .catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({ respuesta: "Pailas, sql totiado" });
            });
    }

    protected static async updateMasivoCargos(
        nombreCargoActual: string,
        nombreCargoNuevo: string,
        res: Response
    ): Promise<any> {
        // actualiza dado un id
        pool
            .task(async (consulta) => {
                let queHacer = 1;
                let respuBase: any;
                try {
                    respuBase = await consulta.none(SQL_PERSONAS.UPDATE_MASSIVE, [
                        nombreCargoActual,
                        nombreCargoNuevo,
                    ]);
                } catch (error) {
                    queHacer = 2;
                }
                return { queHacer, respuBase };
            })
            .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(200).json({ actualizado: "ok" });
                        break;
                    default:
                        res
                            .status(200)
                            .json({
                                respuesta: "Algo salio mal al actualizar o sql totiado",
                            });
                        break;
                }
            })
            .catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({ respuesta: "Pailas, sql totiado" });
            });
    }
    protected static async paginarPersonas(
        limit: number,
        offset: number,
        res: Response
    ) {
        // Verificamos que los parámetros limit y offset sean números válidos
        if (isNaN(limit) || isNaN(offset)) {
            res
                .status(400)
                .json({
                    message: "Los parámetros limit y offset deben ser números válidos",
                });
            return;
        }
    
        try {
            const resultado = await pool.result(SQL_PERSONAS.PAGINACION_PERSONAS, [limit, offset]);
            res.status(200).json(resultado.rows);
        } catch (miError) {
            console.error("Error en la consulta:", miError);
            res.status(400).json({
                Respuesta: "ay no sirve, error en obtenerTodo",
            });
        }
    }
    
    
}

export default PersonaDAO;
