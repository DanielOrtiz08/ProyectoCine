export const SQL_SALAS = {
    // Paginación: obtener salas con límite y offset
    PAGINATE_SALAS: `
        SELECT * FROM cine.Salas
        LIMIT $1 OFFSET $2
    `,
    
    GET_ALL: "SELECT s.id_sala, s.formato_sala, s.capacidad_sala, s.id_cine \
    FROM cine.salas s",

    ADD: "INSERT INTO cine.salas (formato_sala, capacidad_sala, id_cine) \
    VALUES ($1, $2, $3) RETURNING id_sala",

    HOW_MANY:
    "SELECT COUNT(id_sala) as cantidad FROM cine.salas WHERE formato_sala = $1 \
    AND capacidad_sala = $2 AND id_cine = $3",

    DELETE: "DELETE FROM cine.salas WHERE id_sala = $1",

    UPDATE: "UPDATE cine.salas SET id_sala = $1, formato_sala = $2, capacidad_sala = $3, id_cine= $4 \
    WHERE id_sala= $1",
};
