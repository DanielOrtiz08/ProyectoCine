export const SQL_PERSONAS = {
    GET_ALL: "SELECT p.id_persona,p.numero_documento, p.nombres_persona, p.apellidos_persona, p.fecha_nacimiento_persona, p.id_cargo, p.id_ubicacion, p.id_plan, p.celular, p.email_persona, p.contrasenia_persona \
    FROM cine.Personas p",

    ADD: "INSERT INTO cine.Personas (numero_documento, nombres_persona, apellidos_persona, fecha_nacimiento_persona, id_cargo, id_ubicacion, id_plan, celular, email_persona, contrasenia_persona) \
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id_persona",

    HOW_MANY: "SELECT COUNT(id_persona) as existe FROM cine.Personas p \
    WHERE p.numero_documento=$1" , 


    DELETE: "DELETE FROM cine.Personas WHERE numero_documento = $1",

    UPDATE: `UPDATE cine.Personas 
    SET numero_documento=$1, nombres_persona = $2, apellidos_persona = $3, fecha_nacimiento_persona = $4, id_cargo = $5, 
        id_ubicacion = $6, id_plan = $7, celular = $8, email_persona = $9, contrasenia_persona = $10 
    WHERE numero_documento = $1`,

    UPDATE_MASSIVE: "UPDATE cine.Personas SET id_cargo = (SELECT id_cargo FROM cine.Cargos WHERE nombre_cargo = $2) WHERE id_cargo = (SELECT id_cargo FROM cine.Cargos WHERE nombre_cargo = $1)",

    PAGINACION_PERSONAS: "SELECT * FROM cine.Personas ORDER BY numero_documento LIMIT $1 OFFSET $2"
};
