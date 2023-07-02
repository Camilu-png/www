const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLBoolean,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "The user type",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    type: { type: GraphQLString },
  },
});

const PatientType = new GraphQLObjectType({
  name: "PatientType",
  description: "The patient type",
  fields: {
    id: { type: GraphQLID },
    rut: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

const SecretaryType = new GraphQLObjectType({
  name: "SecretaryType",
  description: "The secretary type",
  fields: {
    id: { type: GraphQLID },
    rut: { type: GraphQLString },
    email: { type: GraphQLString },
    center: {
      type: new GraphQLObjectType({
        name: "CentroType",
        fields: {
          name_center: { type: GraphQLString },
          dir: { type: GraphQLString },
        },
      }),
    },
  },
});

const DoctorType = new GraphQLObjectType({
  name: "DoctorType",
  description: "The doctor type",
  fields: {
    id: { type: GraphQLID },
    rut: { type: GraphQLString },
    speciality: { type: GraphQLString },
    email: { type: GraphQLString },
    center: {
      type: new GraphQLObjectType({
        name: "CentroType",
        fields: {
          name_center: { type: GraphQLString },
          dir: { type: GraphQLString },
        },
      }),
    },
    agendaId: { type: GraphQLString },
  },
});

const AgendaInputType = new GraphQLInputObjectType({
  name: "AgendaInput",
  description: "Input type for creating an agenda",
  fields: () => ({
    day: { type: GraphQLString },
    rangoHoras: { type: GraphQLString },
    disponible: { type: GraphQLBoolean },
  }),
});

module.exports = {
  AgendaInputType,
  DoctorType,
  SecretaryType,
  PatientType,
  UserType,
};
