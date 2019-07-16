const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  title: String,
  type: String,
  taskID: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  user: {
    uid: String,
    name: String,
    profession: String,
    company: String,
    email: String,
    image: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", NotificationSchema);
