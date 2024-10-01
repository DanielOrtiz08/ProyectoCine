import { Response, Request } from "express";
import PersonaDao from "../dao/PersonaDao";
import Persona from "../entity/Persona";

class PersonaControlador extends PersonaDao {
    damelasTodas(arg0: string, damelasTodas: any) {
        throw new Error("Method not implemented.");
    }
    public damePersonas(req:Request, res:Response) {
        PersonaDao.obtenerTodo([], res);
    }

    public cogeTuPersona(req:Request, res:Response): void {
        const objCubi: Persona = new Persona (0,0, "", "", new Date(), 0, 0, 0, "", "", "");
        objCubi.numeroDocumento=req.body.numeroDocumento;
        objCubi.nombresPersona = req.body.nombresPersona;
        objCubi.apellidosPersona = req.body.apellidosPersona;
        objCubi.fechaNacimientoPersona = req.body.fechaNacimientoPersona;
        objCubi.idCargo = req.body.idCargo;
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.idPlan = req.body.idPlan;
        objCubi.celular = req.body.celular;
        objCubi.emailPersona = req.body.emailPersona;
        objCubi.contraseniaPersona = req.body.contraseniaPersona;
        PersonaDao.grabeloYa(objCubi, res);
    }

    public borraTuPersona(req: Request, res: Response): void {
        if (isNaN(Number(req.params.numeroDocumento))) {
            res.status(400).json({ respuesta: "Y el numero de documento mi vale?" });
        } else {
            const codiguito = Number(req.params.numeroDocumento);
            const objCubi: Persona = new Persona (0,codiguito,"", "", new Date(), 0, 0, 0, "", "", "");
            PersonaDao.borreloYa(objCubi, res);
        }
    }

    public actualizaPersona(req: Request, res: Response): void {
        const objCubi: Persona = new Persona(0,0, "", "", new Date(), 0, 0, 0, "", "", "");
        objCubi.numeroDocumento=req.body.numeroDocumento;
        objCubi.nombresPersona = req.body.nombresPersona;
        objCubi.apellidosPersona = req.body.apellidosPersona;
        objCubi.fechaNacimientoPersona = req.body.fechaNacimientoPersona;
        objCubi.idCargo = req.body.idCargo;
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.idPlan = req.body.idPlan;
        objCubi.celular = req.body.celular;
        objCubi.emailPersona = req.body.emailPersona;
        objCubi.contraseniaPersona = req.body.contraseniaPersona;
        PersonaDao.actualiceloYa(objCubi, res);
    }

    public cambioDeCargosPersona(req: Request, res: Response): void {
        // Obtenemos los nombres de los cargos desde el cuerpo de la petición
        const nombreCargoActual = req.body.nombreCargoActual; // El nombre del cargo que se quiere cambiar 
        const nombreCargoNuevo = req.body.nombreCargoNuevo;   // El nombre del nuevo cargo 
    
        // Validamos que ambos nombres de cargos hayan sido enviados
        if (!nombreCargoActual || !nombreCargoNuevo) {
            res.status(400).json({ message: "Faltan parámetros: nombreCargoActual y/o nombreCargoNuevo" });
            return;
        }
    
        // Llamamos al DAO para realizar el update masivo
        PersonaDao.updateMasivoCargos(nombreCargoActual, nombreCargoNuevo, res);
    }

    public paginacionPersona(req: Request, res: Response): void {
        const limit = parseInt(req.body.limit, 10); 
        const offset = parseInt(req.body.offset, 10);
    
        // Validamos que ambos hayan sido enviados
        if (isNaN(limit) || isNaN(offset)) {
            res.status(400).json({ message: "Los parámetros limit y offset deben ser números válidos" });
            return;
        }
    
        PersonaDao.paginarPersonas(limit, offset, res);
    }
    
    
    
    
}
const personaControlador = new PersonaControlador();
export default personaControlador;
