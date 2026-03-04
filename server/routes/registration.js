import express from 'express';
import Team from '../models/Team.js';

const router = express.Router();

router.route('/register')
  .post(async (req, res) => {
    console.log(`[Registration] POST request received for: ${req.body.teamName || 'Unknown Team'}`);
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
  })
  .all((req, res) => {
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    console.log(`[Registration] Method Not Allowed: ${req.method} on /register`);
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: `Method ${req.method} not allowed. Use POST.` });
  });

export default router;