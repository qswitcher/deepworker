const { gql } = require("apollo-server");

module.exports = gql`
  type Session {
    _id: ID!
    start: String!
    end: String!
    project: String!
    activity: String
    notes: String
  }

  input SessionInput {
    _id: ID
    start: String!
    end: String!
    project: String!
    activity: String
    notes: String
  }

  type Mutation {
    addSession(session: SessionInput): Session
  }

  type Query {
    sessions: [Session]
  }
`;
