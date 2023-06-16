import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  id_doctor: { type: String, required: true, unique: true, index: true },
  id_paciente: { type: String, required: true, unique: false, index: true },
  schedule: {
    type: [
      {
        String: Number,
        String: Boolean,
        String: String,
      },
    ],
    required: true,
  },
});

const scheduleModel = mongoose.model("Schedule", ScheduleSchema);



export default scheduleModel;
