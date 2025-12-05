const { Schema, model } = require('mongoose');

const roles = ['STUDENT', 'ADMIN'];

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: roles, default: 'STUDENT' },
  },
  { timestamps: true }
);

const User = model('User', UserSchema);

module.exports = User;
