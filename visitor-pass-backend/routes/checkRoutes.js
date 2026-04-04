const express = require("express");
const { checkIn, checkOut } = require("../controllers/checkController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/checkin", protect, checkIn);
router.post("/checkout", protect, checkOut);

module.exports = router;