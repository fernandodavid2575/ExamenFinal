module.exports = (sequelize, Sequelize) => {
    const Juego = sequelize.define("juegos", {
        id_juego: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_juego: {
            type: Sequelize.STRING
        },
        genero: {
            type: Sequelize.STRING
        },
        plataforma: {
            type: Sequelize.STRING
        },
        fecha_lanzamiento: {
            type: Sequelize.DATE
        },
        precio:{
            type: Sequelize.FLOAT
        },
        disponibilidad: {
            type: Sequelize.BOOLEAN
        },
        fecha_alquiler: {
            type: Sequelize.DATE
        },
        fecha_devolucion: {
            type: Sequelize.DATE
        },
        nombre_cliente: {
            type: Sequelize.STRING
        },
        comentarios: {
            type: Sequelize.STRING
        }
    });
    return Juego;
};