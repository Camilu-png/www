import scheduleModel from "../mongodb/models/agenda.js";
import doctorModel from "../mongodb/models/doctor.js";
import { buildSchema } from "graphql";

let schema = buildSchema(`
  type Query {
    schedule(id: String!): Schedule
    allSchedules(id: String): [Schedule]
    doctor(id: String!): Doctor
    allDoctors(id: String): [Doctor]
  },

  type Schedule {
    id: ID!
    id_doctor: String!
    id_paciente: String!
    schedule: [ScheduleItem]!
  }

  type ScheduleItem {
    date: String!
    hour: String!
    available: Boolean!
  }

  type Doctor {
    id: ID!
    email: String!
    name: String!
    rut: String!
    especialidad: String!
    centro: String!
    horas_atencion: [Schedule]
  }`);

const getSchedule = (query) => {
  return (
    scheduleModel.findOne({ id: query.id }),
    (err, schedule) => {
      return err ? err : schedule;
    }
  );
};

const getAllSchedules = (query) => {
  let queryId = query.id && { id: query.id };
  let filter = queryId && { $or: queryId };
  return scheduleModel.find(filter, (err, schedules) =>
    err ? err : schedules
  );
};

const getDoctor = (query) => {
  return (
    doctorModel.findOne({ id: query.id }),
    (err, doctor) => {
      return err ? err : doctor;
    }
  );
};

const getAllDoctors = (query) => {
  let queryId = query.id && { id: query.id };
  let filter = queryId && { $or: queryId };
  return doctorModel.find(filter, (err, doctors) => (err ? err : doctors));
};

const root = {
  schedule: getSchedule,
  allSchedules: getAllSchedules,
  doctor: getDoctor,
  allDoctors: getAllDoctors,
};

export { schema, root };
