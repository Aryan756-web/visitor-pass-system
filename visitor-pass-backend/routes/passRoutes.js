const express = require("express");
const { generatePass, getPasses } = require("../controllers/passController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// get all passes
router.get("/", protect, getPasses);

// generate pass
router.post("/", protect, generatePass);

module.exports = router;