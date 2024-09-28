import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG";

dotenv.config({ path: "variables.env" });

const nombre = String(process.env.NOMBRE_BASE_DE_DATOS);
const usuario = String(process.env.EL_USUARIO);
const puerto = Number(process.env.EL_PUERTO);
const servidor = String(process.env.EL_SERVIDOR);
const clave = String(process.env.LA_CLAVE);

const pgp = pgPromise(optionsPG);
const pool = pgp({
    user: usuario,
    password: clave,
    port: puerto,
    database: nombre,
    host: servidor
});

pool.connect().then((miConn) => {
    console.log("Dios mio sirve ", nombre);
    miConn.done();
}).catch((miError) => {
    console.log(miError);
});

export default pool;