import User from "../models/User.js";
import bcrypt from "bcrypt";
import Note from "../models/Note.js";
import jwt from "jsonwebtoken";

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// REGISTER
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await User.findOne({
    $or: [{ email }, { username }]
  });
  
  if (existing) {
    return res.status(400).json({ error: "Username or email already exists" });
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Create default note
    await Note.create({
      title: "Welcome Note",
      content: "This is your first note!",
      userId: user._id,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ error: "Missing email or password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found, must register" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Incorrect password" });

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// GET CURRENT LOGGED-IN USER
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username email");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
