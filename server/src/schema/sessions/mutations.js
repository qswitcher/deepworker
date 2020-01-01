const Sessions = require("./sessions");

const sessionsMutations = {
  Mutation: {
    async addSession(_, { session }) {
      try {
        const newSession = await Sessions.create({
          ...session
        });
        return newSession;
      } catch (e) {
        console.log(e);
      }
    },

    async removeSession(_, { session: {_id} }) {
      try {
        const session = await Sessions.deleteOne({
          _id
        });
        console.log(`deleted ${_id}`)
        return session;
      } catch (e) {
        console.log("e", e);
      }
    }
  }
};

module.exports = sessionsMutations;
