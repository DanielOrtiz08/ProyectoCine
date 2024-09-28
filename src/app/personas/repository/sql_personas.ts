export const SQL_PERSONAS = {
    GET_ALL: "SELECT p.id_persona, p.nombres_persona, p.apellidos_persona, p.fecha_nacimiento_persona, p.id_cargo, p.id_ubicacion, p.id_plan, p.celular, p.email_persona, p.contrasenia_persona \
    FROM cine.Personas p",

    ADD: "INSERT INTO cine.Personas (nombres_persona, apellidos_persona, fecha_nacimiento_persona, id_cargo, id_ubicacion, id_plan, celular, email_persona, contrasenia_persona) \
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id_persona",

    HOW_MANY: "SELECT COUNT(id_persona) as existe FROM cine.Personas p \
    WHERE p.email_persona = $1", // Verifica cuántas personas tienen el mismo correo electrónico.

    DELETE: "DELETE FROM cine.Personas WHERE id_persona = $1",

    UPDATE: "UPDATE cine.Personas SET nombres_persona = $1, apellidos_persona = $2, fecha_nacimiento_persona = $3, id_cargo = $4, id_ubicacion = $5, id_plan = $6, celular = $7, email_persona = $8, contrasenia_persona = $9 \
    WHERE id_persona = $10"
};
