// server/controllers/authControllers.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

    // ✅ Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      gender,
      dob,
      education,
      class: studentClass,
      stream,
      address: JSON.parse(address),
      profile_pic,
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

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
};
