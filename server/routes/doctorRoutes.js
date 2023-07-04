const express = require('express');
const doctorController = require('../controllers/doctorControler');

const router = express.Router();

// Obtener todos los médicos
router.get('/', doctorController.getDoctors);
// Ruta para obtener doctores por especialidad y centro
router.get('/doctors', doctorController.getDoctorBySpecialityAndCenter);


// Obtener un médico por ID
router.get('/:id', doctorController.getDoctorById);

// Crear un nuevo médico
router.post('/', doctorController.createDoctor);

// Actualizar la disponibilidad de un médico
router.post('/:id/availability', doctorController.updateAvailability);

// Obtener calendario de un médico
router.get('/:id/calendar', doctorController.getDoctorCalendarById);

// Obtener pacientes en espera
router.get('/:id/pacientes-sin-atender', doctorController.getPacientesSinAtender);

router.get('/:userId/obtener-id-doc', doctorController.getDoctorIdByUserId);


module.exports = router;
