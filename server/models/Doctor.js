const { Schema, model, mongoose } = require("mongoose");

const doctorSchema = new Schema({
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
  speciality: {
    type: String,
    required: true,
  },
  center: {
    name_center: {
      type: String,
      required: true,
    },
    dir: {
      type: String,
      required: true,
    },
  },
  agendaId: {
    type: String,
  },
});

module.exports = model("Doctor", doctorSchema);
