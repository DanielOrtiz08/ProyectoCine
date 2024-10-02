export const SQL_RESERVACIONES = {
    // Paginación: obtener reservaciones con límite y offset
    PAGINATE_RESERVACIONES: `
        SELECT * FROM cine.Reservaciones
        ORDER BY id_reservacion ASC
        LIMIT $1 OFFSET $2
    `,

    // Verifica si la reserva ya existe
    CHECK_IF_EXISTS: `
        SELECT COUNT(*) as cantidad
        FROM cine.Reservaciones 
        WHERE id_persona = $1 
        AND id_funcion = $2
    `,

    // Consulta para crear una nueva reserva
    ADD: `
        INSERT INTO cine.Reservaciones (precio, id_persona, id_funcion)
        VALUES ($1, $2, $3)
        RETURNING id_reservacion;
    `,

    // Consulta para obtener todas las reservas
    GET_ALL: `
        SELECT * FROM cine.Reservaciones;
    `,

    // Consulta para obtener una reserva por ID
    GET_BY_ID: `
        SELECT * FROM cine.Reservaciones
        WHERE id_reservacion = $1;
    `,

    // Consulta para actualizar una reserva
    UPDATE: `
        UPDATE cine.Reservaciones
        SET precio = $1, id_persona = $2, id_funcion = $3
        WHERE id_persona = $2 AND id_funcion = $3;
    `,

    // Actualizar el precio de todas las reservaciones para una función
    UPDATE_PRECIO_FUNCION: `
        UPDATE cine.Reservaciones
        SET precio = $1
        WHERE id_funcion = $2
    `,

    // Actualizar todas las reservas de una persona específica
    UPDATE_PRECIO_PERSONA: `
        UPDATE cine.Reservaciones
        SET precio = $1
        WHERE id_persona = $2
    `,

    // Consulta para eliminar una reserva
    DELETE_BY_PERSONA_AND_FUNCTION: `
        DELETE FROM cine.Reservaciones
        WHERE id_persona = $1 AND id_funcion = $2;
    `,

    // Consulta para contar cuántas reservas existen para una función
    COUNT_BY_FUNCION: `
        SELECT COUNT(*) as cantidad FROM cine.Reservaciones
        WHERE id_funcion = $1;
    `,

    // Consulta para contar cuántas reservas existen para una función
    COUNT_BY_PERSONA: `
        SELECT COUNT(*) as cantidad FROM cine.Reservaciones
        WHERE id_persona = $1;
    `,

    // Consulta para obtener las sillas reservadas para una reserva específica
    GET_SILLAS_BY_RESERVACION: `
        SELECT * FROM cine.Sillas_En_Reservacion
        WHERE id_reservacion = $1;
    `,

    // Consulta para agregar sillas a una reservación
    ADD_SILLAS_TO_RESERVACION: `
        INSERT INTO cine.Sillas_En_Reservacion (id_reservacion, id_silla, estado)
        VALUES ($1, $2, $3);
    `,

    // Consulta para eliminar las sillas de una reserva específica
    DELETE_SILLAS_FROM_RESERVACION: `
        DELETE FROM cine.Sillas_En_Reservacion
        WHERE id_silla = $1 AND id_reservacion = $2 ;
    `,

    // Consulta para agregar productos a una reserva
    ADD_PRODUCTO_TO_RESERVACION: `
        INSERT INTO cine.Productos_Por_Reservacion (id_producto, id_reservacion, precio_pedido, cantidad)
        VALUES ($1, $2, $3, $4);
    `,

    // Consulta para obtener los productos de una reservación
    GET_PRODUCTOS_BY_RESERVACION: `
        SELECT * FROM cine.Productos_Por_Reservacion
        WHERE id_reservacion = $1;
    `,

    // Consulta para eliminar productos de una reserva específica
    DELETE_PRODUCTO_FROM_RESERVACION: `
        DELETE FROM cine.Productos_Por_Reservacion
        WHERE id_reservacion = $1 AND id_producto = $2;
    `,

    // Consulta para actualizar el precio de todos las reservas
    UPDATE_PRICE: `
        UPDATE cine.Reservaciones
        SET precio = $1
    `,

    // Consulta para obtener reservas por funcion
    SELECT_RESEVATIONS_BY_FUNCTION: `
        SELECT id_reservacion
        FROM cine.Reservaciones
        WHERE id_funcion = $1
    `,

    // Verifica si la reserva se encuentra en la tabla sillas por reservacion
    CHECK_IF_HAS_CHAIRS: `
        SELECT COUNT(*) as cantidad
        FROM cine.Sillas_En_Reservacion 
        WHERE id_reservacion = $1
    `,

    // Verifica si la reserva se encuentra en la tabla sillas por reservacion
    CHECK_IF_HAS_PRODUCTS: `
        SELECT COUNT(*) as cantidad
        FROM cine.Productos_Por_Reservacion 
        WHERE id_reservacion = $1
    `,
    // Consulta para eliminar una reserva
    DELETE: `
    DELETE FROM cine.Reservaciones
    WHERE id_reservacion = $1;
    `
    
};
