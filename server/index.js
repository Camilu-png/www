import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";

import { graphqlHTTP } from "express-graphql";
import { schema, root } from "./graphql/schema.js";

dotenv.config({ path: "../.env" });

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const startServer = async () => {
  try {
    connectDB(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`
    );
    app.listen(8080, () =>
      console.log("Server started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
