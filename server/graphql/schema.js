const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const {
  doctors,
  doctor,
  login,
  patientByEmail,
  userByEmail,
} = require("./queries");
const {
  createDoc,
  createPatient,
  createAgenda,
  updateDoctor,
} = require("./mutations");

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    doctors,
    doctor,
    login,
    patientByEmail,
    userByEmail,
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    createDoc,
    createPatient,
    createAgenda,
    updateDoctor,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
