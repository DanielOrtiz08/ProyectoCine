import { Response } from "express";
import { SQL_PERSONAS } from "../repository/sql_personas";
import pool from "../../../config/connection/dbConnection";
import Sala from "../entity/Persona";

class PersonaDAO{
    protected static async obtenerTodo(params: any, res: Response) {  
        await pool.result(SQL_PERSONAS.GET_ALL, params).then((resultado) => {
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log(miError);
            res.status(400).json({
                "Respuesta": "ay no sirve, error en obtenerTodo"
            });
        });
    }


    protected static async grabeloYa(datos: Sala, res: Response): Promise<any> { // hace insert 
        await pool
        .task(async (consulta) => {
            let queHacer =1;
            let respuBase: any;
            //const cubi = await consulta.one(SQL_SALAS.HOW_MANY, [datos.idSala]);
            //if(cubi.existe ==0) {
                queHacer =2;
                respuBase = await consulta.one(SQL_PERSONAS.ADD, [datos.nombrePersona, datos.apellidosPersona, datos.apellidosPersona, datos.fechaNacimientoPersona, datos.idCargo, datos.idUbicacion, datos.idPlan, datos.celular, datos.emailPersona, datos.contraseniaPersona]);
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


    
    protected static async borreloYa(datos: Sala, res: Response): Promise<any> { // borra dado un id
        pool
          .task((consulta) => {
            return consulta.result(SQL_PERSONAS.DELETE, [datos.idPersona]);
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

    
    protected static async actualiceloYa(datos: Sala, res: Response): Promise<any> { // actualiza dado un id
        pool
          .task(async (consulta) => {
              let queHacer = 1;
              let respuBase: any;
              //const cubi = await consulta.one(SQL_SALAS.HOW_MANY, [datos.idSala]);
              //if(cubi.existe ==0) {
                  queHacer = 2;
                  respuBase = await consulta.none(SQL_PERSONAS.UPDATE, [datos.idPersona, datos.nombrePersona, datos.apellidosPersona, datos.apellidosPersona, datos.fechaNacimientoPersona, datos.idCargo, datos.idUbicacion, datos.idPlan, datos.celular, datos.emailPersona, datos.contraseniaPersona]);
              //}
              return { queHacer, respuBase };
          })
          .then(({ queHacer, respuBase }) => {
              switch (queHacer) {
                  case 1:
                      res.status(400).json({ respuesta: "Compita ya existe" });
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

}

export default PersonaDAO;
