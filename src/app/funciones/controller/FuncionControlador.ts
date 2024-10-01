import { Response, Request } from "express";
import FuncionDAO from "../dao/FuncionDAO";
import Funcion from "../entity/Funcion";


class FuncionControlador extends FuncionDAO {

    public paginarFunciones(req: Request, res: Response): void {
        const { limite = '10', offset = '0' } = req.query;
    
        const limiteNum = parseInt(limite as string, 10);// Default 10 resultados
        const offsetNum = parseInt(offset as string, 10);// Default desde el inicio
    
        // Validación de 'limite'
        if (isNaN(limiteNum) || limiteNum <= 0) {
            res.status(400).json({
                error: "El parámetro 'limite' debe ser un número positivo.",
                recibido: limite
            });
            return;
        }
    
        // Validación de 'offset'
        if (isNaN(offsetNum) || offsetNum < 0) {
            res.status(400).json({
                error: "El parámetro 'offset' debe ser un número igual o mayor a 0.",
                recibido: offset
            });
            return;
        }
        FuncionDAO.paginarFunciones(limiteNum, offsetNum, res)
    }


    damelasTodas(arg0: string, damelasTodas: any) {
        throw new Error("Method not implemented.");
    }
    public dameFuncion(req:Request, res:Response) {
        FuncionDAO.obtenerFuncion([], res);
    }

    public cogeTuFuncion(req:Request, res:Response): void {
        const objCubi: Funcion = new Funcion(0, 0, "", "", new Date(), 0);
        objCubi.idPelicula = req.body.idPelicula; 
        objCubi.tipoFuncion = req.body.tipoFuncion; 
        objCubi.horaFuncion = req.body.horaFuncion; 
        objCubi.fechaFuncion = new Date(req.body.fechaFuncion); 
        objCubi.idSala = req.body.idSala;

        FuncionDAO.agregarFuncion(objCubi, res);
    }

    public borraTuFuncion(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idFuncion))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        } else {
            const codiguito = Number(req.params.idFuncion);
            const objCubi: Funcion = new Funcion(codiguito, 0, "", "", new Date(), 0);
            FuncionDAO.borrarFuncion(objCubi, res);
        }
    }

    
    public actualizaTuFuncion(req: Request, res: Response): void {
        // Verifica si idFuncion está presente
        if (isNaN(Number(req.body.idFuncion))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        } else {
            const objCubi: Funcion = new Funcion(
                req.body.idFuncion,        
                req.body.idPelicula,      
                req.body.tipoFuncion,      
                req.body.horaFuncion,      
                new Date(req.body.fechaFuncion), 
                req.body.idSala           
            );
            
            FuncionDAO.actualizarFuncion(objCubi, res);
        }
    }

    public actualizaFuncionesPorSala(req: Request, res: Response): void {
        const objCubi: Funcion = new Funcion(
            req.body.idFuncion,        
            req.body.idPelicula,      
            req.body.tipoFuncion,      
            req.body.horaFuncion,      
            new Date(req.body.fechaFuncion), 
            req.body.idSala           
        );
        
        FuncionDAO.actualizarFuncionPorSala(objCubi, res);

    }


    public actualizaFechasFunciones(req: Request, res: Response): void {
            
        const objCubi: Funcion = new Funcion(
            req.body.idFuncion,        
            req.body.idPelicula,      
            req.body.tipoFuncion,      
            req.body.horaFuncion,      
            new Date(req.body.fechaFuncion), 
            req.body.idSala           
        );
            
        FuncionDAO.actualizarFechaFuncion(objCubi, res);
            
    }
    
}
const funcionControlador = new FuncionControlador();
export default funcionControlador;

