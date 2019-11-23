const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to mongo");
});

module.exports = connectDb;
