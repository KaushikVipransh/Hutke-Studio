import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  console.log(`[Auth] Login attempt for username: ${req.body.username}`);
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`[Login Failed] Username '${username}' not found in database.`);
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      console.log(`[Login Failed] Incorrect password for user '${username}'.`);
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create and assign a token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;