// server/server.js
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import authRouter from './router/authRouter.js';



const app = express();

app.use(express.json());
app.use(cors());

connectDB();
app.use('/api', authRouter);  // endpoints: /api/auth/register etc.

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
