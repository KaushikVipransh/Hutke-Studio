import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  division: {
    type: String,
    required: true,
    enum: ['Inter College Group Dance', 'Open Crew Group Dance', 'Inter State Solo Dance Competition', 'Inter State Folk Dance Competition']
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
    required: true,
    lowercase: true,
    trim: true
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
  city: {
    type: String,
    required: function() {
      return this.division === 'Inter State Solo Dance Competition';
    }
  },
  memberCount: {
    type: Number,
    required: true,
    validate: [
      {
        validator: function(v) {
          if (this.division === 'Inter College Group Dance') return v >= 5 && v <= 25;
          if (this.division === 'Open Crew Group Dance') return v >= 3 && v <= 30;
          if (this.division === 'Inter State Solo Dance Competition') return v === 1;
          if (this.division === 'Inter State Folk Dance Competition') return v >= 3 && v <= 25;
          return false;
        },
        message: props => `Member count of ${props.value} is invalid for division "${this.division}". College requires 5-25, Crew 3-30, Folk 3-25, and Solo must be 1.`
      }
    ]
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'STAND_BY'],
    default: 'PENDING'
  }
}, { timestamps: true });

// Create a compound unique index on email and division to prevent duplicate registrations
teamSchema.index({ email: 1, division: 1 }, { unique: true });

export default mongoose.model('Team', teamSchema);