let express = require('express');
let router = express.Router();
 
//Importar tablas
const ejemplos = require('../controllers/ejemplo.controller.js');
const juegos = require('../controllers/juego.controller.js');

//Tabla ejemplos
router.post('/api/ejemplos/create', ejemplos.create);
router.get('/api/ejemplos/all', ejemplos.retrieveAllEjemplos);
router.get('/api/ejemplos/buscar/:nombre', ejemplos.getEjemploByName);
router.get('/api/ejemplos/onebyid/:id', ejemplos.getEjemploById);
router.put('/api/ejemplos/update/:id', ejemplos.updateById);
router.delete('/api/ejemplos/delete/:id', ejemplos.deleteById);

//Tabla Juegos
router.post('/api/juegos/create', juegos.create);
router.get('/api/juegos/onebyid/:id', juegos.getEjemploById);
router.put('/api/juegos/update/:id', juegos.updateById);
router.delete('/api/juegos/delete/:id', juegos.deleteById);





module.exports = router;