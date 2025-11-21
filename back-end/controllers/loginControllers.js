const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const loginUser = async (req, res) => {
const { email, password } = req.body;

if (!email || !password) 
  return res.status(400).json({ message: "Email and password required" });

try {
  const user = await User.findOne({ email });
  if (!user) 
    return res.status(400).json({ message: "Invalid email or password" });


const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) 
    return res.status(400).json({ message: "Invalid email or password" });


const token = createToken(user._id, user.email);
res.status(200).json({ 
  message: "Login successful",
  token, 
  user: { username: user.username, email: user.email } 
});
} catch (error) {
res.status(500).json({ message: "Server error" });
}
};


module.exports = { loginUser };