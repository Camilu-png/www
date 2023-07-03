const express = require('express');
const doctorController = require('../controllers/doctorControler');

const router = express.Router();

// Obtener todos los médicos
router.get('/', doctorController.getDoctors);

// Obtener un médico por ID
router.get('/:id', doctorController.getDoctorById);

// Crear un nuevo médico
router.post('/', doctorController.createDoctor);

// Actualizar la disponibilidad de un médico
router.post('/:id/availability', doctorController.updateAvailability);

// Obtener calendario de un médico
router.get('/:id/calendar', doctorController.getDoctorCalendarById);

// Ruta para obtener doctores por especialidad y centro
router.get('/doctors', doctorController.getDoctorsBySpecialityAndCenter);

module.exports = router;
