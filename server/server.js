const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const morgan = require("morgan");
const path = require("path");
const { connectDB } = require("./db");
const app = express();
const basicAuth = require("express-basic-auth");
const cookieParser = require("cookie-parser");

var cors = require("cors");

connectDB();

const auth = basicAuth({
  users: {
    admin: "123",
    user: "456",
  },
});

app.use(cors());
app.use(cookieParser("82e4e438a0705fabf61f9854e3b575af"));

app.get("/read-cookie", (req, res) => {
  if (req.signedCookies.name === "admin") {
    res.send({ screen: "admin" });
  } else if (req.signedCookies.name === "user") {
    res.send({ screen: "user" });
  } else {
    res.send({ screen: "auth" });
  }
});

app.get("/clear-cookie", (req, res) => {
  res.clearCookie("name").end();
});

app.get("/authenticate", auth, (req, res) => {
  const options = {
    httpOnly: true,
    signed: true,
  };

  if (req.auth.user === "admin") {
    res.cookie("name", "admin", options).send({ screen: "admin" });
  } else if (req.auth.user === "user") {
    res.cookie("name", "user", options).send({ screen: "user" });
  }
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.listen(4000);

console.log("Server is runing in http://localhost:4000");
