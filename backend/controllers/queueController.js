const Queue = require("../models/Queue");

exports.createQueue = async (req, res) => {
  const { name } = req.body;
  try {
    const queue = new Queue({ name });
    await queue.save();
    res.status(201).json(queue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getQueues = async (req, res) => {
  try {
    const queues = await Queue.find().populate("tokens");
    res.json(queues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
