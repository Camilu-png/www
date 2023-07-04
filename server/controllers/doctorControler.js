const Doctor = require('../models/Doctor');
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "secret";
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

// Tomar una hora disponible del doctor
exports.takeAppointment = async (req, res) => {
  const { doctorId, appointmentTime } = req.body;

  try {
    // Buscar al doctor por su ID
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: 'No se encontró al doctor' });
    }

    // Verificar si la hora está disponible
    const appointment = doctor.availability.find(
      (availability) => availability.startTime === appointmentTime && availability.free === true
    );

    if (!appointment) {
      return res.status(400).json({ error: 'La hora no está disponible' });
    }

    // Crear una nueva entrada en Agendas
    const agendaEntry = new Agenda({
      doctor: doctorId,
      appointmentTime: appointmentTime,
      patient: req.user._id, // suponiendo que tienes un sistema de autenticación y obtienes el ID del paciente
    });

    // Guardar la nueva entrada en Agendas
    await agendaEntry.save();

    // Actualizar la disponibilidad del doctor
    appointment.free = false;
    await doctor.save();

    res.status(200).json({ message: 'Hora tomada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al tomar la hora' });
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