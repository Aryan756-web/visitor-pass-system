const Visitor = require("../models/Visitor");

//add visitor
const addVisitor = async (req, res) => {
    try{
        console.log("BODY:", req.body);
        const { name, email, phone, photo } = req.body;

        const visitor = new Visitor({
            name, email, phone, photo
        });

        await visitor.save();

        res.status(201).json({
            message: "Visitor added successfully"
        });
    } catch (error) {
        console.log("ADD VISITOR ERROR:", error);
        res.status(500).json({ message : "Server error"});
    }
};

// get all visitors
const getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find();

        res.json(visitors);
    } catch (error) {
  console.log("ERROR:", error);
  res.status(500).json({ message: error.message });
}
};

//Delete Visitor
const deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    res.json({ message: "Visitor deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting visitor" });
  }
};

module.exports = { addVisitor, getVisitors, deleteVisitor };