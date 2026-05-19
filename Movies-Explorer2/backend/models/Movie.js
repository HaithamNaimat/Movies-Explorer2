import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  director: {
    type: String,
    required: [true, 'Director is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 0,
    max: 10
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Movie', movieSchema);
