const { Schema, model } = require("mongoose");

const specialitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  centro: {
    type: [{
      name: {
        type: String,
        required: true,
      },
      dir: {
        type: String,
        required: true,
      },
    }],
    required: true,
  },
});

module.exports = model("Speciality", specialitySchema);
