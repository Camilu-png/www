const{Schema, model} = require('mongoose');

const horarioSchema = new Schema({
    day: String,
    rangoHoras:{
        inicio: String,
        fin: String
    },
    disponible: Boolean,
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    }

});

module.exports = model("Horario", horarioScheme);