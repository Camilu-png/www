const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const morgan = require("morgan");
const path = require("path");
const { connectDB } = require("./db");
const app = express();
const UserRouter = require("./controllers/User");
const SecretaryRouter = require("./controllers/Secretary");
const DoctorRouter = require("./routes/doctorRoutes");
const SpecialityRouter = require("./routes/specialityRoutes");
const agendaRouter = require("./routes/agendaRoutes");
const cors = require("cors");
const { isLoggedIn } = require("./controllers/middleware");

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/user", UserRouter);
app.use("/secretary", SecretaryRouter);
app.use("/doctor", DoctorRouter);
app.use("/speciality", SpecialityRouter);
app.use("/agenda", agendaRouter);


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    use: [isLoggedIn],
  })
);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.listen(4000);

console.log("Server is runing in http://localhost:4000");
