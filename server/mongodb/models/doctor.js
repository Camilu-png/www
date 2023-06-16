import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  rut: { type: String, required: true },
  especialidad: { type: String, required: true },
  centro: { type: (String, String), required: true },
  horas_atencion: [{ type: mongoose.Schema.Types.ObjectId, ref: "agenda" }],
});

const doctorModel = mongoose.model("Doctor", DoctorSchema);

export default doctorModel;
