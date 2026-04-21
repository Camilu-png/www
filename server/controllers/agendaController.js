require('dotenv').config();
const { Router } = require('express');
const Agenda = require('../models/Agenda');

const router = Router();

router.get('/patient/:email', async (req, res) => {
  try {
    const agendas = await Agenda.find({ email_paciente: req.params.email }).populate('email_doctor');
    res.json(agendas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const agendas = await Agenda.find();
    res.json(agendas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const agenda = await Agenda.create(req.body);
    res.json(agenda);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const agenda = await Agenda.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(agenda);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Agenda.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;