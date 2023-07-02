const { GraphQLString, GraphQLList, GraphQLID } = require("graphql");
const { DoctorType } = require("./types");
const { Doctor, User } = require("../models");

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

module.exports = { doctors, doctor, login };
