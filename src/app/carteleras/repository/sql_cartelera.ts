export const SQL_CARTELERAS = {
    GET_ALL: "SELECT id_pelicula, id_cine, fecha_inicio_cartelera, fecha_final_cartelera \
    FROM cine.cartelera",

    ADD: "INSERT INTO cine.cartelera (id_pelicula, id_cine, fecha_inicio_cartelera, fecha_final_cartelera) \
    VALUES ($1, $2, $3, $4) RETURNING id_pelicula, id_cine",

    HOW_MANY:
    "SELECT COUNT(id_pelicula) as existe FROM cine.cartelera \
    WHERE  id_cine = $2",

    DELETE: "DELETE FROM cine.cartelera WHERE id_pelicula = $1 AND id_cine = $2",

    UPDATE: "UPDATE cine.cartelera SET  id_pelicula = $1, id_cine = $2, fecha_inicio_cartelera = $3, fecha_final_cartelera = $4 \
    WHERE id_pelicula= $1 AND id_cine = $2",

    GET_PAGINATED: "SELECT id_pelicula, id_cine, fecha_inicio_cartelera, fecha_final_cartelera \
    FROM cine.cartelera \ LIMIT $1 OFFSET $2",   
};