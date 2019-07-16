const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
    uid: String,
    name: String,
    profession: String,
    company: String,
    email: String,
    image: String
  },
  timeRange: {
    start: String,
    end: String
  },
  day: Date,
  apartment: String,
  color: String,
  status: String,
  icon: String,
  comments: [
    {
      user: {
        uid: String,
        name: String,
        profession: String,
        company: String,
        email: String,
        image: String
      },
      createdAt: { type: Date, default: Date.now },
      description: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Task", TaskSchema);
