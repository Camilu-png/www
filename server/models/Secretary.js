const { Schema, model } = require("mongoose");

const secretarySchema = new Schema({
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
});

module.exports = model("Secretary", secretarySchema);