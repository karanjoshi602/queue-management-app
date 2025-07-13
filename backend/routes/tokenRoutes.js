const express = require("express");
const router = express.Router();
const { addToken, assignToken, cancelToken } = require("../controllers/tokenController");
const Token = require("../models/Token");


router.post("/", addToken);
router.put("/assign/:tokenId", assignToken);
router.put("/cancel/:tokenId", cancelToken);


router.delete("/:id", async (req, res) => {
  try {
    await Token.findByIdAndDelete(req.params.id);
    res.json({ message: "Token deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/status", async (req, res) => {
  const { status } = req.body;
  try {
    const token = await Token.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(token);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
