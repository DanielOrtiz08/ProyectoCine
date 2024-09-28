import { Response, Request } from "express";
import PersonaDao from "../dao/PersonaDao";
import Sala from "../entity/Persona";
import Persona from "../entity/Persona";

class PersonaControlador extends PersonaDao {
    damelasTodas(arg0: string, damelasTodas: any) {
        throw new Error("Method not implemented.");
    }
    public damePersonas(req:Request, res:Response) {
        PersonaDao.obtenerTodo([], res);
    }

    public cogeTuPersona(req:Request, res:Response): void {
        const objCubi: Persona = new Sala (0, "", "", new Date(), 0, 0, 0, "", "", "");
        objCubi.nombrePersona = req.body.nombrePersona;
        objCubi.apellidosPersona = req.body.apellidosPersona;
        objCubi.fechaNacimientoPersona = req.body.fecha_nacimiento_persona;
        objCubi.idCargo = req.body.idCargo;
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.idPlan = req.body.idPlan;
        objCubi.celular = req.body.celular;
        objCubi.emailPersona = req.body.emailPersona;
        objCubi.contraseniaPersona = req.body.contraseniaPersona;
        PersonaDao.grabeloYa(objCubi, res);
    }

    public borraTuPersona(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idPersona))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        } else {
            const codiguito = Number(req.params.idPersona);
            const objCubi: Persona = new Persona (codiguito,"", "", new Date(), 0, 0, 0, "", "", "");
            PersonaDao.borreloYa(objCubi, res);
        }
    }

    public actualizaPersona(req: Request, res: Response): void {
        const objCubi: Sala = new Sala(0, "", "", new Date(), 0, 0, 0, "", "", "");
        objCubi.idPersona = req.body.idPersona;
        objCubi.nombrePersona = req.body.nombrePersona;
        objCubi.apellidosPersona = req.body.apellidosPersona;
        objCubi.fechaNacimientoPersona = req.body.fecha_nacimiento_persona;
        objCubi.idCargo = req.body.idCargo;
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.idPlan = req.body.idPlan;
        objCubi.celular = req.body.celular;
        objCubi.emailPersona = req.body.emailPersona;
        objCubi.contraseniaPersona = req.body.contraseniaPersona;
        PersonaDao.actualiceloYa(objCubi, res);
    }
}
const personaControlador = new PersonaControlador();
export default personaControlador;
