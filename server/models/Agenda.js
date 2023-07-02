const { Schema, model } = require('mongoose');

const agendaSchema = new Schema({
    agenda: [
        {
            day: {type: String},
            rangoHoras: {type: String},
            disponible: {type: String},
            
        }
    ]
});

module.exports = model("Agenda", agendaSchema);