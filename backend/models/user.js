import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  steamId: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  displayName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  photo: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const User = mongoose.model('User', UserSchema);