const Speciality = require('../models/Speciality');
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "secret";

// Crear una especialidad
exports.createSpeciality = async (req, res) => {
  const { name } = req.params;
  const { centro } = req.body;

  try {
    const speciality = new Speciality({ name, centro });
    await speciality.save();

    res.status(201).json(speciality);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la especialidad' });
  }
};
  
  // Obtener todas las especialidades
  exports.getAllSpecialities = async (req, res) => {
    try {
      const specialities = await Speciality.find();
  
      res.status(200).json(specialities);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las especialidades' });
    }
  };