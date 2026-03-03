import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined.");
  console.error("Please ensure a .env file exists in the project root with your MongoDB connection string.");
  process.exit(1);
}

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // CHANGE THESE CREDENTIALS
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      console.error("Error: ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file.");
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 1. Delete existing user to ensure a clean slate
    await User.deleteOne({ username });

    // 2. Create fresh user
    await User.create({ username, password: hashedPassword, role: 'admin' });
    
    console.log(`Admin user '${username}' seeded successfully.`);
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();