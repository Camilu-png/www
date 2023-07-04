const Doctor = require('../models/Doctor');
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "secret";
const Agenda = require('../models/Agenda');
const Patient = require('../models/Patient');
const User = require('../models/User');
// Obtener todos los médicos
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error al obtener los médicos:', error);
    res.status(500).json({ error: 'Error al obtener los médicos' });
  }
};
// Obtener doctores por especialidad y centro
exports.getDoctorBySpecialityAndCenter = async (req, res) => {
  const { speciality, center } = req.query;

  try {
    const doctors = await Doctor.find({ speciality: speciality, center:center });

    res.json(doctors);
  } catch (error) {
    console.error('Error al obtener los médicos por especialidad y centro:', error);
    res.status(500).json({ error: 'Error al obtener los médicos por especialidad y centro' });
  }
};
// Obtener un médico por ID
exports.getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ error: 'Médico no encontrado' });
    }
    res.json(doctor);
  } catch (error) {
    console.error('Error al obtener el médico:', error);
    res.status(500).json({ error: 'Error al obtener el médico' });
  }
};

// Obtener el calendario de un médico por ID
exports.getDoctorCalendarById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return res.status(404).json({ error: 'Médico no encontrado' });
      }
  
      res.json(doctor.calendar);
    } catch (error) {
      console.error('Error al obtener el calendario del médico:', error);
      res.status(500).json({ error: 'Error al obtener el calendario del médico' });
    }
  };

// Crear un nuevo médico
exports.createDoctor = async (req, res) => {
  const { email, speciality, center, availability } = req.body;

  try {
    const doctor = await Doctor.create({ email, speciality, center, availability });
    res.status(201).json(doctor);
  } catch (error) {
    console.error('Error al crear el médico:', error);
    res.status(500).json({ error: 'Error al crear el médico' });
  }
};

// Actualizar la disponibilidad de un médico y generar el calendario
exports.updateAvailability = async (req, res) => {
  const { id } = req.params;
  const { availability } = req.body;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ error: 'Médico no encontrado' });
    }

    doctor.availability = availability;
    doctor.calendar = generateCalendar(doctor.availability);

    await doctor.save();

    res.json(doctor);
  } catch (error) {
    console.error('Error al actualizar la disponibilidad y generar el calendario del médico:', error);
    res.status(500).json({ error: 'Error al actualizar la disponibilidad y generar el calendario del médico' });
  }
};

exports.getPacientesSinAtender = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ error: 'Médico no encontrado' });
    }

    const agendasSinAtender = await Agenda.find({ _id: { $in: doctor.agendaId }, atencion: false, email_paciente: { $exists: true } });
    const pacientesSinAtender = [];

    for (const agenda of agendasSinAtender) {
      const paciente = await Patient.findOne({ email: agenda.email_paciente });
      if (paciente) {
        pacientesSinAtender.push({
          paciente,
          horario: agenda.date,
        });
      }
    }

    res.json(pacientesSinAtender);
  } catch (error) {
    console.error('Error al obtener los pacientes sin atender:', error);
    res.status(500).json({ error: 'Error al obtener los pacientes sin atender' });
  }
};

exports.getDoctorIdByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const doctor = await Doctor.findOne({ email: user.email });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor no encontrado' });
    }

    res.json({ doctorId: doctor._id });
  } catch (error) {
    console.error('Error al obtener el ID del doctor:', error);
    res.status(500).json({ error: 'Error al obtener el ID del doctor' });
  }
};


// Función para generar el calendario a partir de la disponibilidad

const generateCalendar = (availability) => {
  const calendar = [];

  const startDate = new Date(); // Aquí puedes establecer la fecha de inicio
  const endDate = new Date(); // Aquí puedes establecer la fecha de fin
  endDate.setDate(endDate.getDate() + 90);

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const availabilityOfDay = availability.find(item => item.day === dayOfWeek);

    if (availabilityOfDay) {
      const startTime = availabilityOfDay.startTime;
      const endTime = availabilityOfDay.endTime;

      calendar.push({
        date: currentDate.toISOString().substring(0, 10),
        availability: [{ startTime, endTime, free: false }],
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return calendar;
};