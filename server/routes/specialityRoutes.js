// routes.js

const express = require('express');
const specialityController = require('../controllers/specialityControler');

const router = express.Router();

// Ruta para crear una especialidad
router.post('/', specialityController.createSpeciality);

// Ruta para obtener todas las especialidades
router.get('/', specialityController.getAllSpecialities);

module.exports = router;
