const mongoose = require('mongoose'); // ✅ Add this line

// server/models/StudentMeta.js
const StudentMetaSchema = new mongoose.Schema({
    board: String,
    wallet: Number,
    referral_code: String,
  });
  
  module.exports = StudentMetaSchema;
  