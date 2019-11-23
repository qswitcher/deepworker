const mongoose = require("mongoose");
const { Schema } = mongoose;

const SessionsSchema = new Schema({
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  project: {
    type: String,
    required: true
  },
  activity: String,
  notes: String
});

module.exports =
  mongoose.models.sessions || mongoose.model("sessions", SessionsSchema);
