import mongoose from 'mongoose';

// server/models/StudentMeta.js
const StudentMetaSchema = new mongoose.Schema({
    board: String,
    wallet: Number,
    referral_code: String,
  });
  
  export default StudentMetaSchema;
  