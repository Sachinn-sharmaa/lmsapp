const mongoose = require('mongoose'); // ✅ Add this line

// server/models/User.js
const TeacherMeta = require('./TeacherMeta');
const StudentMeta = require('./StudentMeta');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  gender: String,
  dob: String,
  address: {
    full: String,
    city: String,
    state: String,
    pincode: String,
  },
  education: String,
  class: String,
  stream: String,
  profile_pic: String,
  created_at: { type: Date, default: Date.now },
  status: { type: Number, default: 1 },
  teacher_meta: TeacherMeta,
  student_meta: StudentMeta,
});

module.exports = mongoose.model('User', UserSchema);
