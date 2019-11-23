const { ApolloServer } = require("apollo-server");
const schema = require("./schema");
const connectDb = require("./mongoose");

require("dotenv").config();

const server = new ApolloServer({
  ...schema,
  introspection: true, // enables introspection of the schema
  playground: true // enables the actual playground
});

connectDb().then(() => {
  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
