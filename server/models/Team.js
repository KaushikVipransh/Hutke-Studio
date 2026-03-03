import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  division: {
    type: String,
    required: true,
    enum: ['Inter College Group Dance', 'Open Crew Group Dance']
  },
  teamName: {
    type: String,
    required: true
  },
  pocName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  collegeName: {
    type: String,
    required: function() {
      return this.division === 'Inter College Group Dance';
    }
  },
  memberCount: {
    type: Number,
    required: true,
    min: [3, 'Minimum 3 members required'],
    validate: {
      validator: function(v) {
        if (this.division === 'Inter College Group Dance' && v > 25) return false;
        if (this.division === 'Open Crew Group Dance' && v > 30) return false;
        return true;
      },
      message: 'Member count exceeds the limit for the selected division (College: 25, Crew: 30).'
    }
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'STAND_BY'],
    default: 'PENDING'
  }
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);