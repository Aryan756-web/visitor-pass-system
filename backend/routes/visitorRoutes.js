const express = require("express");
const { addVisitor, getVisitors } = require("../controllers/visitorController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addVisitor);
router.get("/", protect, getVisitors);

module.exports = router;