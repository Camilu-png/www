const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const { doctors, doctor } = require("./queries");
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
