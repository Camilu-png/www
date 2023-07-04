const { Schema, model } = require("mongoose");

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rut: {
    type: String,
    required: true,
  },
  agendaId:[{
    type:String
  }]
});

module.exports = model("Patient", patientSchema);
