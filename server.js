import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import houseAssetRoute from './routes/houseAssetRoute.js';
import { seedSuperAdmin } from './utils/seedAdmin.js';
import userRoute from './routes/userRoute.js'; // Add this at the top with your other imports
dotenv.config();

const app = express();

// Global Middleware
app.use(express.json());

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/house-assets', houseAssetRoute);

app.use('/api/users', userRoute);

// Database Connection & Server Startup
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/house_asset_system';

mongoose.connect("mongodb://localhost:27017/harry")
  .then(async () => {
    console.log('Connected to MongoDB successfully');
    
    // Seed default super admin user on startup
    await seedSuperAdmin();

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });