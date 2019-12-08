const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const Sessions = require("./sessions");

const sessions = [
  {
    start: new Date(Date.UTC(2019, 1, 3, 3, 4, 0)),
    end: new Date(Date.UTC(2019, 1, 3, 4, 32, 0)),
    project: "Deepwork",
    activity: "Coding"
  },
  {
    start: new Date(Date.UTC(2019, 2, 11, 3, 4, 0)),
    end: new Date(Date.UTC(2019, 2, 11, 3, 54, 5)),
    project: "Deepwork",
    activity: "Coding"
  },
  {
    start: new Date(Date.UTC(2019, 2, 11, 3, 4, 0)),
    end: new Date(Date.UTC(2019, 2, 11, 4, 54, 5)),
    project: "Story of Philosophy",
    activity: "Reading"
  },
  {
    start: new Date(Date.UTC(2019, 2, 11, 3, 4, 0)),
    end: new Date(Date.UTC(2019, 2, 11, 3, 12, 5)),
    project: "Story of Philosophy",
    activity: "Reading"
  },
  {
    start: new Date(Date.UTC(2019, 4, 11, 3, 4, 0)),
    end: new Date(Date.UTC(2019, 4, 11, 3, 54, 10)),
    project: "Deepwork",
    activity: "Coding"
  },
  {
    start: new Date(Date.UTC(2019, 4, 11, 3, 4, 0)),
    end: new Date(Date.UTC(2019, 4, 11, 3, 54, 10)),
    project: "Algorithms",
    activity: "Coding"
  },
  {
    start: new Date(Date.UTC(2019, 5, 21, 3, 4, 0)),
    end: new Date(Date.UTC(2019, 5, 21, 3, 54, 10)),
    project: "Deepwork",
    activity: "Coding"
  },
  {
    start: new Date(Date.UTC(2019, 5, 21, 4, 4, 0)),
    end: new Date(Date.UTC(2019, 5, 21, 4, 54, 10)),
    project: "Algorithms",
    activity: "Coding"
  }
];

const sessionsResolvers = {
  Query: {
    async sessions() {
      try {
        return await Sessions.find();
      } catch (e) {
        console.log(e);
      }
    }
  },

  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); //value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  })
};

module.exports = sessionsResolvers;
