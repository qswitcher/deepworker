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
    }
  }
};

module.exports = sessionsMutations;
