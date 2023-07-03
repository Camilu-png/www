const Doctor = require('../models/Doctor');

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
