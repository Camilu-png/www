const { Schema, model } = require('mongoose');

const agendaSchema = new Schema({
    email_paciente: {
        type: String,
        required: true
    },
    email_doctor: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }

});

module.exports = model("Agenda", agendaSchema);