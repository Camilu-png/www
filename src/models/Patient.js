const { Schema, model } = require('mongoose');

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true
    }

});

module.exports = model("Patient", patientSchema);