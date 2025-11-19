const Signup = require("../models/signupModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// GET all signups
const getAllSignups = async (req, res) => {
  try {
    const signups = await Signup.find({}).sort({ createdAt: -1 });
    res.status(200).json(signups);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve signups" });
  }
};

// POST create signup
const createSignup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check duplicate email
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newSignup = new Signup({
      username,
      email,
      password: hashedPassword
    });

    await newSignup.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET signup by ID
const getSignupById = async (req, res) => {
  const { signupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(signupId)) {
    return res.status(400).json({ message: "Invalid Signup ID" });
  }

  try {
    const signup = await Signup.findById(signupId);

    if (!signup) {
      return res.status(404).json({ message: "Signup not found" });
    }

    res.status(200).json(signup);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve signup" });
  }
};

// UPDATE signup
const updateSignup = async (req, res) => {
  const { signupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(signupId)) {
    return res.status(400).json({ message: "Invalid Signup ID" });
  }

  let updateData = { ...req.body };

  // If password is being updated, re-hash it
  if (updateData.password) {
    if (updateData.password !== updateData.confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    updateData.password = await bcrypt.hash(updateData.password, 10);

    delete updateData.confirmPassword;
  }

  try {
    const updatedSignup = await Signup.findByIdAndUpdate(
      signupId,
      updateData,
      { new: true }
    );

    if (!updatedSignup) {
      return res.status(404).json({ message: "Signup not found" });
    }

    res.status(200).json(updatedSignup);
  } catch (error) {
    res.status(500).json({ message: "Failed to update signup" });
  }
};

// DELETE signup
const deleteSignup = async (req, res) => {
  const { signupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(signupId)) {
    return res.status(400).json({ message: "Invalid Signup ID" });
  }

  try {
    const deletedSignup = await Signup.findByIdAndDelete(signupId);

    if (!deletedSignup) {
      return res.status(404).json({ message: "Signup not found" });
    }

    res.status(200).json({ message: "Signup deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete signup" });
  }
};

module.exports = {
  getAllSignups,
  createSignup,
  getSignupById,
  updateSignup,
  deleteSignup,
};
