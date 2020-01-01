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

  input DeleteInput {
    _id: ID
  }

  type Mutation {
    addSession(session: SessionInput): Session
    removeSession(session: DeleteInput): Session
  }

  type Query {
    sessions: [Session]
  }
`;
