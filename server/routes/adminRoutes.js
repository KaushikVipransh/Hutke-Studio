import express from 'express';
import Team from '../models/Team.js';
import authMiddleware from '../models/authMiddleware.js';

const router = express.Router();

// GET /api/admin/submissions
// Fetch all submissions sorted by most recent
router.get('/submissions', authMiddleware, async (req, res) => {
  try {
    const submissions = await Team.find().sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
});

// PATCH /api/admin/submissions/:id
// Update the status of a specific team
router.patch('/submissions/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

export default router;