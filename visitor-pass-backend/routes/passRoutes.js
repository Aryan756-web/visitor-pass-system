const express = require("express");
const { generatePass } = require("../controllers/passController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, async (req, res) => {
  const passes = await require("../models/Pass").find();
  res.json(passes);
});

router.post("/", protect, generatePass);

module.exports = router;