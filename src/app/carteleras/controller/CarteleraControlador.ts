import { Response, Request } from "express";
import CarteleraDAO from "../dao/CarteleraDAO";
import Cartelera from "../entity/Cartelera";

class CarteleraControlador extends CarteleraDAO {
    damelasTodas(arg0: string, damelasTodas: any) {
        throw new Error("Method not implemented.");
    }
    public dameCarteleras(req:Request, res:Response) {
        CarteleraDAO.obtenerTodo([], res);
    }

    public cogeTuCartelera(req:Request, res:Response): void {
        const objCubi: Cartelera = new Cartelera (0, 0, null, null);
        objCubi.idPelicula = req.body.idPelicula;
        objCubi.idCine = req.body.idCine;
        objCubi.fechaInicioCartelera = req.body.fechaInicioCartelera;
        objCubi.fechaFinCartelera = req.body.fechaFinCartelera;
        CarteleraDAO.grabeloYa(objCubi, res);
    }

    public borraTuCartelera(req: Request, res: Response): void {
        const idPelicula = Number(req.params.idPelicula);
        const idCine = Number(req.params.idCine);
        if (isNaN(idPelicula) || isNaN(idCine)) {
            res.status(400).json({ respuesta: "El ID de la película o del cine no es válido." });
        } else {
            const objCubi: Cartelera = new Cartelera(idPelicula, idCine, null, null);
            CarteleraDAO.borreloYa(objCubi, res);
        }
    }

    public actualizaTuCartelera(req: Request, res: Response): void {
        const objCubi: Cartelera = new Cartelera(0, 0, null, null);
        objCubi.idPelicula = req.body.idPelicula;
        objCubi.idCine = req.body.idCine;
        objCubi.fechaInicioCartelera = req.body.fechaInicioCartelera;
        objCubi.fechaFinCartelera = req.body.fechaFinCartelera;
        CarteleraDAO.actualiceloYa(objCubi, res);
    }

    public dameCartelerasPaginadas(req: Request, res: Response): void {
        const limite = parseInt(req.query.limite as string, 10) || 10;  // Default 10 resultados
        const offset = parseInt(req.query.offset as string, 10) || 0;   // Default desde el inicio
    
        CarteleraDAO.obtenerPaginado(limite, offset, res);
    }
    
}
const carteleraControlador = new CarteleraControlador();
export default carteleraControlador;