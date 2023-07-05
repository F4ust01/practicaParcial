// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores

const { obtenerReservas, crearUnaReserva, editarReserva, eliminarUnaReserva, obtenerUnaReserva } = require('../controllers/reserva.controllers');

const router = require('express').Router();


// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Obtener todas las reservas

router.get('/', (req, res) => {
    res.render("index.ejs")
});
 

// Formulario para crear una reserva

router.get('/crear-reserva', (req, res) => {
    res.render("crear-reserva.ejs")
});

// Formulario para actualizar una reserva

router.get('/actualizar-reserva/:id', (req, res) => {
    const idReserva = req.params.id
    res.render("actualizar-reserva.ejs", {id : idReserva})
});

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

//Obtener una reserva
router.get('/api/:id', obtenerUnaReserva);
 
// Obtener todas las reservas
router.get('/api/', obtenerReservas);
 
// Crear una reserva
router.post('/api/', crearUnaReserva);
 
// Actualizar una reserva
router.put('/api/:id', editarReserva);
 
// Eliminar una reserva de forma lógica
router.delete('/api/:id', eliminarUnaReserva);

 
 module.exports = router;