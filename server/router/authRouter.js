// server/router/authRouter.js

import express from 'express';
import upload from '../middlewares/handleImageUploads.js';
import { registerUser, loginUser } from '../controllers/authControllers.js';

const router = express.Router();

// Route: POST /api/auth/register
router.post('/register', upload.fields([
  { name: 'profile_pic' }, { name: 'aadhar_card' }, { name: 'pan_card' }
]), registerUser);

// Route: POST /api/auth/login
router.post('/login', loginUser);

export default router;
