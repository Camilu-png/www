const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const { hello } = require('./queries')
const { createDoc, createPatient } = require('./mutations')
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: 'The root query type',
    fields: {
        hello,
    }
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "The root mutation type",
    fields: {
        createDoc, createPatient
    },
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
