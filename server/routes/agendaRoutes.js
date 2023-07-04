const express = require('express');
const agendaControler = require('../controllers/agendaControler');

const router = express.Router();

// Tomar hora
router.post('/', agendaControler.createAgenda);

module.exports = router;