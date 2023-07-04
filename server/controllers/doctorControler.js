const Doctor = require('../models/Doctor');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "secret";
const Agenda = require('../models/Agenda');
const Patient = require('../models/Patient');
const User = require('../models/User');
// Obtener todos los médicos
exports.getDoctors = async (req, res) => {
  try {
    let doctors = await Doctor.find();

    doctors = await Promise.all(doctors.map(async (doctor) =>{
      const infoDoctor = await User.find({
        email:doctor.email,
      });
    
      return {
        id:doctor._id,
        email:doctor.email,
        speciality: doctor.speciality,
        center: doctor.center,
        availability: doctor.availability,
        calendar: doctor.calendar,
        agendaId: doctor.agendaId,
        name: infoDoctor[0].name,
        type: infoDoctor[0].type,
      }
    }))    
    res.json(doctors);
  } catch (error) {
    console.error('Error al obtener los médicos:', error);
    res.status(500).json({ error: 'Error al obtener los médicos' });
  }
};
// Obtener doctores por especialidad y centro
exports.getDoctorsBySpecialityAndCenter = async (req, res) => {
  const { speciality, center } = req.params;
  console.log(speciality, center)

  try {
    const doctors = await Doctor.find({
      speciality: speciality,
      center: center,
    }).select('_id rut speciality center availability');

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los doctores' });
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

// Crear un nuevo médico
exports.createDoctor = async (req, res) => {
  const { rut, speciality, center, availability } = req.body;

  try {
    const doctor = await Doctor.create({ rut, speciality, center, availability });
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

    console.log(id)
    console.log(availability)
  
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
          date: currentDate.toISOString(),
          availability: [{ startTime, endTime }],
        });
      }
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return calendar;
  };
