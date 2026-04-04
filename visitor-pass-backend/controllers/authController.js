const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;

        //check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = new User({
            name, email, password: hashedPassword, role
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Server error "});
    }
};

const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        //check user exists 
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: "User not found "});
        }

        //check password

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password"});
        }

        // generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } 
        );

        res.json({
            message: "Login successful",
            token 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
};

module.exports = { registerUser, loginUser };