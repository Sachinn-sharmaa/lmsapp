const express = require('express');
const router = express.Router();
const upload = require('../middlewares/handleImageUploads');
const { registerUser, loginUser } = require('../controllers/authControllers');

// Route: POST /api/auth/register
router.post('/register', upload.fields([
  { name: 'profile_pic' }, { name: 'aadhar_card' }, { name: 'pan_card' }
]), registerUser);

// Route: POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;
