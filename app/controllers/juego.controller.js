const db = require('../config/db.config.js');
const Juego = db.Juego;

exports.create = (req, res) => {
    let juego = {};

    try {
        juego.nombre_juego = req.body.nombre_juego;
        juego.genero = req.body.genero;
        juego.plataforma = req.body.plataforma;
        juego.fecha_lanzamiento = req.body.fecha_lanzamiento;
        juego.precio = req.body.precio;
        juego.disponibilidad = req.body.disponibilidad;
        juego.fecha_alquiler = req.body.fecha_alquiler;
        juego.fecha_devolucion = req.body.fecha_devolucion;
        juego.nombre_cliente = req.body.nombre_cliente;
        juego.comentarios = req.body.comentarios;

        Juego.create(juego).then(result => {
            res.status(200).json({
                message: "juego creado exitosamente con id = " + result.id_juego,
                juego: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el juego!",
            error: error.message
        });
    }
};

exports.retrieveAllEjemplos = (req, res) => {
    Ejemplo.findAll()
        .then(ejemploInfos => {
            res.status(200).json({
                message: "¡ejemplos obtenidos exitosamente!",
                ejemplos: ejemploInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los ejemplos!",
                error: error
            });
        });
};

exports.getJuegoById = (req, res) => {
    let juegoId = req.params.id;
    Juego.findByPk(juegoId)
        .then(juego => {
            res.status(200).json({
                message: "juego obtenido exitosamente con id = " + juegoId,
                juego: juego
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener el juego con id!",
                error: error
            });
        });
};

exports.getEjemploByName = (req, res) => {
    const ejemploName = req.params.nombre;
    Ejemplo.findAll({ where: { nombre: ejemploName } })
        .then(ejemplos => {
            res.status(200).json({
                message: "ejemplos obtenidas exitosamente con el nombre = " + ejemploName,
                ejemplos: ejemplos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los ejemplos!",
                error: error.message
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let juegoId = req.params.id;
        let juego = await Juego.findByPk(juegoId);
    
        if (!juego) {
            res.status(404).json({
                message: "No se encontró el juego para actualizar con id = " + juegoId,
                juego: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                nombre_juego: req.body.nombre_juego,
                genero: req.body.genero,
                plataforma: req.body.plataforma,  
                fecha_lanzamiento: req.body.fecha_lanzamiento,
                precio: req.body.precio,
                disponibilidad: req.body.disponibilidad,
                fecha_alquiler: req.body.fecha_alquiler,
                fecha_devolucion: req.body.fecha_devolucion,
                nombre_cliente: req.body.nombre_cliente,
                comentarios: req.body.comentarios
            }
            let result = await Juego.update(updatedObject, {returning: true, where: {id_juego: juegoId}});
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un juego con id = " + req.params.id,
                    error: "No se pudo actualizar el juego",
                });
            };

            res.status(200).json({
                message: "Actualización exitosa de un juego con id = " + juegoId,
                juego: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el juego con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let juegoId = req.params.id;
        let juego = await Juego.findByPk(juegoId);

        if (!juego) {
            res.status(404).json({
                message: "No existe el juego con id = " + juegoId,
                error: "404",
            });
        } else {
            await juego.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del juego con id = " + juegoId,
                juego: juego,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un juego con id = " + req.params.id,
            error: error.message,
        });
    }
}