const { gql } = require("apollo-server");

const sessions = [
  {
    start: new Date(Date.UTC(2019, 2, 11, 3, 4, 0)).toISOString(),
    end: new Date(Date.UTC(2019, 2, 11, 3, 54, 5)).toISOString(),
    project: "Deepwork",
    activity: "Coding"
  },
  {
    start: new Date(Date.UTC(2019, 2, 12, 3, 4, 0)).toISOString(),
    end: new Date(Date.UTC(2019, 2, 12, 4, 54, 5)).toISOString(),
    project: "Story of Philosophy",
    activity: "Reading"
  },
  {
    start: new Date(Date.UTC(2019, 3, 11, 3, 4, 0)).toISOString(),
    end: new Date(Date.UTC(2019, 3, 11, 3, 12, 5)).toISOString(),
    project: "Story of Philosophy",
    activity: "Reading"
  },
  {
    start: new Date(Date.UTC(2019, 4, 11, 3, 4, 0)).toISOString(),
    end: new Date(Date.UTC(2019, 4, 11, 3, 54, 10)).toISOString(),
    project: "Deepwork",
    activity: "Coding"
  }
];

// The GraphQL schema in string form
const typeDefs = gql`
  type Query {
    sessions: [Session]
  }
  type Session {
    start: String
    end: String
    project: String
    activity: String
    notes: String
  }
`;

// The resolvers
const resolvers = {
  Query: { sessions: () => sessions }
};

const schema = {
  typeDefs,
  resolvers
};

module.exports = schema;
