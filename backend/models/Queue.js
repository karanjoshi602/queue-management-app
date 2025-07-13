const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tokens: [{ type: mongoose.Schema.Types.ObjectId, ref: "Token" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Queue", queueSchema);
