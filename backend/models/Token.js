const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  personName: { type: String, required: true },
  queue: { type: mongoose.Schema.Types.ObjectId, ref: "Queue" },
  status: {
    type: String,
    enum: ["waiting", "assigned", "cancelled"],
    default: "waiting",
  },
  createdAt: { type: Date, default: Date.now },
  assignedAt: { type: Date },
});

module.exports = mongoose.model("Token", tokenSchema);
