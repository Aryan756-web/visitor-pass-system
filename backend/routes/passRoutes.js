const express = require("express");
const { generatePass, getPasses, downloadPassPDF } = require("../controllers/passController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// get all passes
router.get("/", protect, getPasses);

// generate pass
router.post("/", protect, generatePass);


//download pass
router.get("/pdf/:id", protect, downloadPassPDF);

module.exports = router;