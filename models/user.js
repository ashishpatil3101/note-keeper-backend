import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, trim: true },
  password: {type: String, required: true, trim: true},
});

const User = mongoose.model('User', UserSchema);

export default User;
