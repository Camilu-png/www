const { GraphQLString } = require("graphql");
const { Doctor, Patient } = require("../models");

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
        dir: { type: GraphQLString }
    },
    async resolve(_,args){
        const {name, password, email,rut, speciality, name_center, dir} = args;
        const center = {name_center, dir};
        const newDoctor = new Doctor({name, password, email, rut, speciality, center});

        const doctor = await newDoctor.save()
        return "new Doctor created";
    }
};

const createPatient = {
    type: GraphQLString,
    description: "Create a new patient",
    args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        rut: { type: GraphQLString }
    },
    async resolve(_,args){
        const {name, password, email,rut} = args;
        const newPatient = new Patient({name, password, email, rut});

        const patient = await newPatient.save()
        return "new Patient created";
    }
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
    createDoc, createPatient
};
