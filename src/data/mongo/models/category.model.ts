import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [false, 'Description is required'],
  },
  available: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
}, {
  timestamps: true,
  versionKey: false,
});

export const CategoryModel = mongoose.model('Category', categorySchema);
