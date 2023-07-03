const { Schema, model, mongoose } = require("mongoose");

const doctorSchema = new Schema({
  rut: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  center: {
    type: String,
    required: true,
  },
  availability: [{
    day: String,
    startTime: String,
    endTime: String,
  }],
  calendar: [{
    date: String,
    availability: [{
      startTime: String,
      endTime: String,
    }]
  }],
  agendaId: [{
    type: String,
  }],
});

module.exports = model("Doctor", doctorSchema);
