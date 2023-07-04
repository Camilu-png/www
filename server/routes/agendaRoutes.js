const express = require('express');
const agendaControler = require('../controllers/agendaControler');

const router = express.Router();

// Tomar hora
router.post('/', agendaControler.createAgenda);

// Horas tomadas
router.get('/', );

module.exports = router;