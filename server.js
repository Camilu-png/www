const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const { connectDB } = require('./db')
const app = express();


connectDB()

app.get('/', (req, res) => {
    res.send("Hello world ")
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(4000);

console.log("Server is runing in http://localhost:4000");