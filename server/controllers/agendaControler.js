
const Agenda = require('../models/Agenda');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient')
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "secret";

// Crear una nueva agenda
exports.createAgenda = async (req, res) => {
    const { email_paciente, email_doctor, date } = req.body;
    console.log(email_paciente)
    try {
      const doctor = await Doctor.findOne({ email: email_doctor });
  
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor no encontrado' });
      }
      const patient = await Patient.findOne({ email: email_paciente });

    if (!patient) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

  
      const agenda = doctor.calendar.find(item => item.date === date);
  
      if (!agenda) {
        return res.status(404).json({ error: 'Fecha no disponible' });
      }
  
      if (!agenda.free) {
        return res.status(409).json({ error: 'La fecha ya está ocupada' });
      }
  
      agenda.free = false;
  
      await doctor.save();
  
      const newAgenda = new Agenda({
        email_paciente,
        email_doctor,
        date,
      });
  
      await newAgenda.save();
  
      doctor.agendaId.push(newAgenda._id);
  
      await doctor.save();
      
      
    patient.agendaId = newAgenda._id;

    await patient.save();

      res.json(newAgenda);
    } catch (error) {
      console.error('Error al crear la agenda:', error);
      res.status(500).json({ error: 'Error al crear la agenda' });
    }
  };
  
  
  

