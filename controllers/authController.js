import userModel from '../models/user.js'; // Optional: renamed import for clarity, or keep 'user'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: role || 'manager'
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fixed: Changed local variable from 'user' to 'foundUser'
    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: foundUser._id, role: foundUser.role,email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Logged in successfully', token, role: foundUser.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};