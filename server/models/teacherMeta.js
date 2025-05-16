// server/models/TeacherMeta.js
import mongoose from "mongoose";

const TeacherMetaSchema = new mongoose.Schema({
  teach_mode: String,
  online_price: String,
  home_price: String,
  availability: String,
  infrastructure: String,
  subject: String,
  university: String,
  aadhar_card: String,
  pan_card: String,
  demo_video_url: String,
});

export default TeacherMetaSchema;