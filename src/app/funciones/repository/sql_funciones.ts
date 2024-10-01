export const SQL_FUNCIONES = {
    GET_ALL: "SELECT f.id_funcion, f.id_pelicula, f.tipo_funcion, f.hora_funcion,\
    f.fecha_funcion,f.id_sala \
    FROM cine.funciones f",

    ADD: "INSERT INTO cine.funciones (id_pelicula, tipo_funcion, hora_funcion,\
    fecha_funcion,id_sala ) \
    VALUES ($1, $2, $3,$4,$5) RETURNING id_funcion",


    PAGINATE_FUNTIONS: `
        SELECT * FROM cine.funciones
        ORDER BY id_funcion ASC
        LIMIT $1 OFFSET $2

    `,

    //consultar si existe una funciones por todos sus parametros
    CHECK_IF_EXISTS: `
        SELECT 1 AS existe
        FROM cine.funciones
        WHERE id_pelicula = $1 AND hora_funcion = $2
        AND fecha_funcion = $3 AND id_sala = $4;

    `,

    //consultar si existe una funciones solo por el id de la funcion
    CHECK_IF_EXISTS_FUNCION: `
        SELECT 1 AS existe
        FROM cine.funciones
        WHERE id_funcion = $1;
    `,

    CHECK_IF_EXISTS_SALA:`
        SELECT count(id_sala) AS existe
        FROM cine.funciones
        WHERE id_sala = $1;
    `,

    CHECK_IF_EXISTS_PELICULA: `
        SELECT count(id_pelicula) AS existe
        FROM cine.funciones
        WHERE id_pelicula = $1;
    `,

    //borrar una funcion
    DELETE: "DELETE FROM cine.funciones WHERE id_funcion = $1",

    // actualizar una función específica
    UPDATE: `
    UPDATE cine.Funciones
    SET id_pelicula =$2, tipo_funcion = $3, hora_funcion = $4, fecha_funcion = $5, id_sala = $6
    WHERE id_funcion = $1
    `,


    // Actualizar el tipo de función de todas las funciones de una sala específica
    UPDATE_TIPO_FUNCION_SALA: `
    UPDATE cine.Funciones
    SET tipo_funcion = $1
    WHERE id_sala = $2
    `,

    // Actualizar la fecha de la función para todas las funciones de una película en una sala específica
    UPDATE_FECHA_FUNCION: `
    UPDATE cine.Funciones
    SET fecha_funcion = $1
    WHERE id_pelicula = $2 AND id_sala = $3;
    `,


};


