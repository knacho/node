import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['admin', 'mortal'],
  },
  beersTaken: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beer',
    },
  ],
});

export default mongoose.model('User', userSchema);
