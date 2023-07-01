const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const morgan = require("morgan");
const path = require("path");
const { connectDB } = require("./db");
const app = express();

connectDB();

// app.get("/", (req, res) => {
//   res.send("Hello world ");
// });

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
