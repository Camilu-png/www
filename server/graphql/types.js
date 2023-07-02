const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInputObjectType, GraphQLBoolean } = require("graphql");

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
        center: {
            type: new GraphQLObjectType({
                name:"CentroType",
                fields:{
                    name_center: {type: GraphQLString},
                    dir: {type: GraphQLString}
                }
            }),
        },
        agendaId:{ type: GraphQLString }
    }
});

const AgendaInputType = new GraphQLInputObjectType({
  name: 'AgendaInput',
  description: 'Input type for creating an agenda',
  fields: () => ({
    day: { type: GraphQLString },
    rangoHoras: { type: GraphQLString },
    disponible: { type: GraphQLBoolean }
  })
});


module.exports ={
    DoctorType, AgendaInputType
}