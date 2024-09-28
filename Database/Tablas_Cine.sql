-- -----------------------------------------------------
-- Schema cine
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS cine;

-- -----------------------------------------------------
-- Table cine.Generos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Generos (
  id_genero SERIAL PRIMARY KEY,
  nombre_genero VARCHAR(45) NOT NULL
);

-- -----------------------------------------------------
-- Table cine.Peliculas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Peliculas (
  id_pelicula SERIAL PRIMARY KEY,
  nombre_pelicula VARCHAR(45) NOT NULL,
  id_genero INT NOT NULL,
  duracion_pelicula TIME NOT NULL,
  clasificacion VARCHAR(45) NOT NULL,
  sinopsis VARCHAR(600),
  reparto VARCHAR(45),
    FOREIGN KEY (id_genero)
    REFERENCES cine.Generos (id_genero)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX fk_Peliculas_Generos_idx ON cine.Peliculas (id_genero);

-- -----------------------------------------------------
-- Table cine.TipoUbicacion
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Tipo_Ubicacion (
  id_tipo_ubicacion SERIAL PRIMARY KEY,
  nombre_tipo_ubicacion VARCHAR(45) NOT NULL
);

-- -----------------------------------------------------
-- Table cine.Ubicaciones
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Ubicaciones (
  id_ubicacion SERIAL PRIMARY KEY,
  nombre_ubicacion VARCHAR(45) NOT NULL,
  id_padre INT NULL,
  id_tipo_ubicacion INT NOT NULL,
    FOREIGN KEY (id_tipo_ubicacion)
    REFERENCES cine.Tipo_Ubicacion (id_tipo_ubicacion)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    FOREIGN KEY (id_padre)
    REFERENCES cine.Ubicaciones (id_ubicacion)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);


CREATE INDEX fk_Ubicaciones_Ubicaciones1_idx ON cine.Ubicaciones (id_padre);
CREATE INDEX fk_ubicaciones_tipos_ubicaciones1_idx ON cine.Ubicaciones (id_tipo_ubicacion);

-- -----------------------------------------------------
-- Table cine.Cines
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Cines (
  id_cine SERIAL PRIMARY KEY,
  nombre_cine VARCHAR(45) NOT NULL,
  id_ubicacion INT NOT NULL,
  descripcion_cine VARCHAR(300) NOT NULL,
    FOREIGN KEY (id_ubicacion)
    REFERENCES cine.Ubicaciones (id_ubicacion)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX fk_Cines_Ubicaciones1_idx ON cine.Cines (id_ubicacion);

-- -----------------------------------------------------
-- Table cine.Salas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Salas (
  id_sala SERIAL PRIMARY KEY,
  capacidad_sala INT NOT NULL,
  formato_sala VARCHAR(45) NOT NULL,
  id_cine INT NOT NULL,
    FOREIGN KEY (id_cine)
    REFERENCES cine.Cines (id_cine)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX fk_Salas_Cines1_idx ON cine.Salas (id_cine);



CREATE TABLE IF NOT EXISTS cine.Funciones (
  id_funcion SERIAL PRIMARY KEY,
  id_pelicula INT NOT NULL,
  tipo_funcion VARCHAR(45) NOT NULL,
  hora_funcion TIME NOT NULL,
  fecha_funcion DATE NOT NULL,
  id_sala INT NOT NULL,
  FOREIGN KEY (id_pelicula)
    REFERENCES cine.Peliculas (id_pelicula)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (id_sala)
    REFERENCES cine.Salas (id_sala)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX fk_funciones_peliculas1_idx ON cine.Funciones (id_pelicula);
CREATE INDEX fk_funciones_salas1_idx ON cine.Funciones (id_sala);

-- -----------------------------------------------------
-- Table cine.Tipos_Sillas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Tipos_Sillas (
  id_tipos_sillas SERIAL PRIMARY KEY,
  tipo_silla VARCHAR(45) NOT NULL
);

-- -----------------------------------------------------
-- Table cine.Sillas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Sillas (
  id_silla SERIAL PRIMARY KEY,
  id_sala INT NOT NULL,
  id_tipo_silla INT NOT NULL,
  FOREIGN KEY (id_sala)
    REFERENCES cine.Salas (id_sala)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (id_tipo_silla)
    REFERENCES cine.Tipos_Sillas (id_tipos_sillas)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX fk_sillas_salas1_idx ON cine.Sillas (id_sala);
CREATE INDEX fk_sillas_tipos_sillas1_idx ON cine.Sillas (id_tipo_silla);

-- -----------------------------------------------------
-- Table cine.Cargos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Cargos (
  id_cargo SERIAL PRIMARY KEY,
  nombre_cargo VARCHAR(60) NOT NULL,
  descripcion_cargo VARCHAR(100) NOT NULL
);

-- -----------------------------------------------------
-- Table cine.Planes
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Planes (
  id_plan SERIAL PRIMARY KEY,
  nombre_plan VARCHAR(45) NOT NULL,
  precio_plan REAL NOT NULL,
  beneficios_plan VARCHAR(1200) NOT NULL
);

-- -----------------------------------------------------
-- Table cine.Personas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Personas (
  id_persona SERIAL PRIMARY KEY,
  nombres_persona VARCHAR(45) NOT NULL,
  apellidos_persona VARCHAR(45) NOT NULL,
  fecha_nacimiento_persona DATE NOT NULL,
  id_cargo INT NOT NULL,
  id_ubicacion INT NOT NULL,
  id_plan INT NOT NULL,
  celular VARCHAR(45) NOT NULL,
  email_persona VARCHAR(45) NOT NULL,
  contrasenia_persona VARCHAR(45) NOT NULL,
  FOREIGN KEY (id_cargo)
    REFERENCES cine.Cargos (id_cargo)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (id_ubicacion)
    REFERENCES cine.Ubicaciones (id_ubicacion)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (id_plan)
    REFERENCES cine.Planes (id_plan)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX fk_personas_cargos1_idx ON cine.Personas (id_cargo);
CREATE INDEX fk_personas_ubicaciones1_idx ON cine.Personas (id_ubicacion);
CREATE INDEX fk_personas_planes1_idx ON cine.Personas (id_plan);

-- -----------------------------------------------------
-- Table cine.Reservaciones
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Reservaciones (
  id_reservacion SERIAL PRIMARY KEY,
  precio REAL NOT NULL,
  id_persona INT NOT NULL,
  id_funcion INT NOT NULL,
  FOREIGN KEY (id_persona)
    REFERENCES cine.Personas (id_persona)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (id_funcion)
    REFERENCES cine.Funciones (id_funcion)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
  CONSTRAINT unique_persona_funcion UNIQUE (id_persona, id_funcion)
);

CREATE INDEX fk_reservaciones_personas1_idx ON cine.Reservaciones (id_persona);
CREATE INDEX fk_reservaciones_funciones1_idx ON cine.Reservaciones (id_funcion);

-- -----------------------------------------------------
-- Table cine.Cartelera
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Cartelera (
  id_pelicula INT NOT NULL,
  id_cine INT NOT NULL,
  fecha_inicio_cartelera DATE NOT NULL,
  fecha_final_cartelera DATE NOT NULL,
  PRIMARY KEY (id_pelicula, id_cine),
  FOREIGN KEY (id_pelicula)
    REFERENCES cine.Peliculas (id_pelicula)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (id_cine)
    REFERENCES cine.Cines (id_cine)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX fk_peliculas_has_cines_cines1_idx ON cine.Cartelera (id_cine);
CREATE INDEX fk_peliculas_has_cines_peliculas1_idx ON cine.Cartelera (id_pelicula);

-- -----------------------------------------------------
-- Table cine.Productos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Productos (
  id_producto SERIAL PRIMARY KEY,
  nombre_producto VARCHAR(45) NOT NULL,
  descripcion_producto VARCHAR(300) NOT NULL
);

-- -----------------------------------------------------
-- Table cine.Confiterias
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Confiterias (
  id_producto INT NOT NULL,
  id_cine INT NOT NULL,
  precio_producto_cine REAL NOT NULL,
  PRIMARY KEY (id_producto, id_cine),
  FOREIGN KEY (id_producto)
    REFERENCES cine.Productos (id_producto)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (id_cine)
    REFERENCES cine.Cines (id_cine)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX fk_productos_has_cines_cines1_idx ON cine.Confiterias (id_cine);
CREATE INDEX fk_productos_has_cines_productos1_idx ON cine.Confiterias (id_producto);

-- -----------------------------------------------------
-- Table cine.Productos_Por_Reservacion
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Productos_Por_Reservacion (
  id_producto INT NOT NULL,
  id_reservacion INT NOT NULL,
  precio_pedido REAL NOT NULL,
  cantidad INT NOT NULL,
  PRIMARY KEY (id_producto, id_reservacion),
  FOREIGN KEY (id_producto)
    REFERENCES cine.Productos (id_producto)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (id_reservacion)
    REFERENCES cine.Reservaciones (id_reservacion)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX fk_productos_has_reservaciones_reservaciones1_idx ON cine.Productos_Por_Reservacion (id_reservacion);
CREATE INDEX fk_productos_has_reservaciones_productos1_idx ON cine.Productos_Por_Reservacion (id_producto);

-- -----------------------------------------------------
-- Table cine.Sillas_En_Reservacion
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cine.Sillas_En_Reservacion (
  id_silla INT NOT NULL,
  id_reservacion INT NOT NULL,
  estado VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_silla, id_reservacion),
  FOREIGN KEY (id_silla)
    REFERENCES cine.Sillas (id_silla)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (id_reservacion)
    REFERENCES cine.Reservaciones (id_reservacion)
    ON DELETE NO RESTRICT
    ON UPDATE CASCADE
);

CREATE INDEX fk_sillas_has_reservaciones_reservaciones1_idx ON cine.Sillas_En_Reservacion (id_reservacion);
CREATE INDEX fk_sillas_has_reservaciones_sillas1_idx ON cine.Sillas_En_Reservacion (id_silla);
