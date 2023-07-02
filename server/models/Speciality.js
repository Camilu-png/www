const { Schema, model, mongoose } = require("mongoose");

const specialitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  centro: {
    type: [{ String, String }],
    required: true,
  },
});

module.exports = model("Speciality", specialitySchema);
