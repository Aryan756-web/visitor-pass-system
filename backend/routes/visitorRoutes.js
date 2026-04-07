const express = require("express");
const { addVisitor, getVisitors, deleteVisitor } = require("../controllers/visitorController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addVisitor);
router.get("/", protect, getVisitors);
router.delete("/:id", protect, deleteVisitor);

module.exports = router;