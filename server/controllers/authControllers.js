// authControllers.js

import User from '../models/userSchema.js';

export const registerUser = async (req, res) => {
  try {
    const files = req.files;

    const {
      name, email, phone, password, role, gender, dob, education,
      class: studentClass, stream, address
    } = req.body;

    const profile_pic = files?.profile_pic?.[0]?.path || '';

    const teacher_meta = role === 'teacher'
      ? {
          ...JSON.parse(req.body.teacher_meta),
          aadhar_card: files?.aadhar_card?.[0]?.path || '',
          pan_card: files?.pan_card?.[0]?.path || ''
        }
      : undefined;

    const student_meta = role === 'student'
      ? JSON.parse(req.body.student_meta)
      : undefined;

    const newUser = new User({
      name, email, phone, password, role, gender, dob, education,
      class: studentClass, stream, address: JSON.parse(address), profile_pic,
      teacher_meta,
      student_meta
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  return res.json({ success: true, user });
};
