import express from 'express';
const router = express.Router();
import Team from '../models/Team.js';

router.post('/register', async (req, res) => {
  try {
    // Normalize division to match Mongoose Enum exactly (handle lowercase/mismatch)
    if (req.body.division) {
      const divLower = req.body.division.toLowerCase();
      if (divLower.includes('college')) {
        req.body.division = 'Inter College Group Dance';
      } else if (divLower.includes('crew')) {
        req.body.division = 'Open Crew Group Dance';
      }
    }

    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();
    res.status(201).json({ message: 'Registration successful', team: savedTeam });
  } catch (error) {
    // Add more detailed logging for future debugging
    console.error("Registration Error:", error.message);
    console.error("Request Body:", req.body);
    res.status(400).json({ message: error.message });
  }
});

export default router;