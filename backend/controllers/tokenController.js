const Token = require("../models/Token");
const Queue = require("../models/Queue");

exports.addToken = async (req, res) => {
  const { personName, queueId } = req.body;
  try {
    const token = new Token({ personName, queue: queueId });
    await token.save();

    await Queue.findByIdAndUpdate(queueId, { $push: { tokens: token._id } });

    res.status(201).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.assignToken = async (req, res) => {
  const { tokenId } = req.params;
  try {
    const token = await Token.findByIdAndUpdate(
      tokenId,
      { status: "assigned", assignedAt: new Date() },
      { new: true }
    );
    res.json(token);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelToken = async (req, res) => {
  const { tokenId } = req.params;
  try {
    const token = await Token.findByIdAndUpdate(tokenId, { status: "cancelled" }, { new: true });
    res.json(token);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
