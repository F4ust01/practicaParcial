const Reserva = require("../models/Reserva");

const ctrlReservas = {};

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas

ctrlReservas.obtenerReservas= async (req, res) => {
   try {
    const todasLasReservas = await Reserva.findAll()
    if (!todasLasReservas.length) {
        throw new Error("No hay reservas")
    }
    return res.json(todasLasReservas)
   } catch (error) {
    console.error(error)
   } 
}

// Obtener una reserva
ctrlReservas.obtenerUnaReserva= async (req, res) => {
    const {id} = req.params
    try {
     const unaReserva = await Reserva.findByPk(id)
     if (!unaReserva) {
         throw new Error("No existe la reserva")
     }
     return res.json(unaReserva)
    } catch (error) {
     console.error(error)
    } 
 }

// Crear una reserva
ctrlReservas.crearUnaReserva= async (req, res) => {
    
    const { nombre, apellido, fecha_ingreso, fecha_salida, habitacion, cantidad_personas, telefono, email } = req.body

    try {
     const nuevaReserva = await Reserva.create({
        nombre, 
        apellido, 
        fecha_ingreso, 
        fecha_salida, 
        habitacion, 
        cantidad_personas, 
        telefono, 
        email,
        codigo: new Date().getTime()
     })
     if (!nuevaReserva) {
         throw new Error("No se ha podido crear la reserva")
     }
     return res.json({nuevaReserva, message: "Reserva creada correctamente"})
    } catch (error) {
     console.error(error)
    } 
 }

// Actualizar una reserva

ctrlReservas.editarReserva= async (req, res) => {
    
    const { nombre, apellido, fecha_ingreso, fecha_salida, habitacion, cantidad_personas, telefono, email } = req.body
    const {id} = req.params
    try {
     const editarReserva = await Reserva.update({
        nombre, 
        apellido, 
        fecha_ingreso, 
        fecha_salida, 
        habitacion, 
        cantidad_personas, 
        telefono, 
        email
     },
     {where : { idReserva: id}})
     if (!editarReserva) {
         throw new Error("No se ha podido editar la reserva")
     }
     return res.json(editarReserva)
    } catch (error) {
     console.error(error)
    } 
 }

// Eliminar una reserva de forma lógica

ctrlReservas.eliminarUnaReserva= async (req, res) => {
    const {id} = req.params
    try {
     const reservaEliminada = await Reserva.destroy({where : {idReserva:id}})
     if (!reservaEliminada) {
         throw new Error("No se ha podido eliminar la reserva")
     }
     return res.json(reservaEliminada)
    } catch (error) {
     console.error(error)
    } 
 }


module.exports = ctrlReservas;