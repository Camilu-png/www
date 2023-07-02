const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
} = require("graphql");
const { Doctor, Patient, Agenda } = require("../models");
const { DoctorType, AgendaInputType } = require("./types");

const createDoc = {
  type: GraphQLString,
  description: "Create a new doctor",
  args: {
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    rut: { type: GraphQLString },
    speciality: { type: GraphQLString },
    name_center: { type: GraphQLString },
    dir: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { name, password, email, rut, speciality, name_center, dir } = args;
    const center = { name_center, dir };
    const newDoctor = new Doctor({
      name,
      password,
      email,
      rut,
      speciality,
      center,
    });

    const doctor = await newDoctor.save();
    return "new Doctor created";
  },
};

const updateDoctor = {
  type: DoctorType,
  description: "Update Doctor",
  args: {
    id: { type: GraphQLID },
    agendaId: { type: GraphQLString },
  },
  async resolve(_, { id, agendaId }) {
    const updateDoctor = await Doctor.findOneAndUpdate(
      { _id: id },
      {
        agendaId,
      },
      { new: true }
    );
    return {};
  },
};

const createPatient = {
  type: GraphQLString,
  description: "Create a new patient",
  args: {
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    rut: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { name, password, email, rut } = args;
    const newPatient = new Patient({ name, password, email, rut });

    const patient = await newPatient.save();
    return "new Patient created";
  },
};

const createAgenda = {
  type: GraphQLString,
  description: "Create a new agenda",
  args: {
    agenda: { type: new GraphQLList(AgendaInputType) },
  },
  async resolve(_, args) {
    const { agenda } = args;

    try {
      // Crea las nuevas entradas de agenda
      const createdAgendas = new Agenda({ agenda });
      /* await createdAgendas.save() */
      if (!createdAgendas) {
        throw new Error("Error al crear las agendas");
      }
      await createdAgendas.save();
      return "Nuevas agendas creadas";
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear las agendas");
    }
  },
};

/* const setDisponibles = {
    type: GraphQLString,
    description: "Set the avaible hours of the doctors",
    args: {
        id:{type:GraphQLID},
        
    }
    resolve() {
        return "Avaible hours set!"
    }

}; */
module.exports = {
  createDoc,
  createPatient,
  createAgenda,
  updateDoctor,
};
