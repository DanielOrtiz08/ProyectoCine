import cors from "cors";
import express from "express";
import morgan from "morgan";
import apiSalaRuta from "../../app/salas/route/SalaRuta";
import apiReservacionRuta from "../../app/reservaciones/route/ReservacionRuta";
import apiRutaFuncion from "../../app/funciones/route/FuncionRuta";
import apiPersonaRuta from "../../app/personas/route/PersonaRuta"


class Servidor {
    public app:express.Application;

    constructor() {
        this.app = express();
        this.cargarConfiguracion();
        this.exponerEndPoint();
        this.configurarManejoErrores();
    }
    
    public cargarConfiguracion() :void {
        this.app.set("PORT", 3123);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        //tamaño maximo de archivo
        this.app.use(express.json({limit:"50mb"}));
        this.app.use(express.urlencoded({extended:true}));
    }

    public exponerEndPoint():void {
        this.app.use("/room",apiSalaRuta);
        this.app.use("/reservation", apiReservacionRuta);
        this.app.use("/funciones",apiRutaFuncion);
        this.app.use("/people",apiPersonaRuta);

    }

    public configurarManejoErrores(): void {
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.error(err.stack);
            res.status(500).json({ error: "Algo salió mal en el servidor." });
        });
    }

    public iniciar(): void {
        this.app.listen(this.app.get("PORT"), () => {
            console.log(`Servidor corriendo en el puerto ${this.app.get("PORT")}`);
        });
    }
}

export default Servidor;