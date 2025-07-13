const express = require("express");
const router = express.Router();
const { createQueue, getQueues } = require("../controllers/queueController");
const Queue = require("../models/Queue");

router.post("/", createQueue);
router.get("/", getQueues);

router.delete("/:id", async (req, res) => {
  try {
    await Queue.findByIdAndDelete(req.params.id);
    res.json({ message: "Queue deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
