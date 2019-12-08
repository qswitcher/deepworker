const { gql } = require("apollo-server");

module.exports = gql`
  scalar Date

  type Session {
    _id: ID!
    start: Date!
    end: Date!
    project: String!
    activity: String
    notes: String
  }

  input SessionInput {
    _id: ID
    start: Date!
    end: Date!
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
