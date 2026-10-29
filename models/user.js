import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['super_admin', 'admin', 'manager'], 
    default: 'manager' 
  }
}, { timestamps: true });

// Check if model already exists to prevent OverwriteModelError
const user = mongoose.models.user || mongoose.model('user', userSchema);

export default user;