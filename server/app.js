const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();
const schema = require("./schema/schema");

app.get("/", (req, res) => {
  res.status(200).json("Hello, prasanv!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Running server at http://localhost:4000");
});
