const { GraphQLString, GraphQLList, GraphQLID } = require("graphql");
const { DoctorType, PatientType, UserType } = require("./types");
const { Doctor, User, Patient } = require("../models");

const login = {
  type: GraphQLString,
  resolver: async (_, args) => {
    const user = await User.findOne({
      email: args.email,
      password: args.password,
    });
    return !user ? null : user.type;
  },
};

const doctors = {
  type: new GraphQLList(DoctorType),
  description: "get doctors",
  async resolve() {
    const doctors = await Doctor.find();
    return doctors;
  },
};

const doctor = {
  type: DoctorType,
  description: "get a doctor by id",
  args: {
    id: { type: GraphQLID },
  },
  resolve(_, args) {
    return Doctor.findById(args.id);
  },
};

const patientByEmail = {
  type: PatientType,
  description: "get a patient by email",
  args: {
    email: { type: GraphQLString },
  },
  resolve(_, args) {
    return Patient.findOne({ email: args.email });
  },
};

const userByEmail = {
  type: UserType,
  description: "get a user by email",
  args: {
    email: { type: GraphQLString },
  },
  resolve(_, args) {
    return User.findOne({ email: args.email });
  },
};

module.exports = { doctors, doctor, login, patientByEmail, userByEmail };
