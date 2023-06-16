const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const DoctorType = new GraphQLObjectType({
    name: "DoctorType",
    description: "The doctor type",
    fields: {
        id:{type: GraphQLID},
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        rut: { type: GraphQLString },
        speciality: { type: GraphQLString },
        centro: {
            type: GraphQLString,
            /* name_center: { type: GraphQLString },
            dir: { type: GraphQLString } */
        }
    }
})

module.exports ={
    DoctorType,
}