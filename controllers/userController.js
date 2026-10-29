import user from '../models/user.js';
import bcrypt from 'bcryptjs'; // Required for hashing the new user's password

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await user.find().select('-password'); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get current logged-in user profile
export const getUserProfile = async (req, res) => {
  try {
    const foundUser = await user.findById(req.user.id).select('-password');
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user (Restricted to super_admin in routes)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Validate role
    const validRoles = ['super_admin', 'admin', 'manager'];
    const assignedRole = validRoles.includes(role) ? role : 'manager';

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      name,
      email,
      password: hashedPassword,
      role: assignedRole
    });

    await newUser.save();

    // Exclude password from the response object
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({ 
      message: 'User created successfully by Super Admin', 
      user: userResponse 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ['super_admin', 'admin', 'manager'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    const updatedUser = await user.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await user.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};