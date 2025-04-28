const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRouter = require('./router/authRouter');

const app = express();

app.use(express.json());

connectDB();
app.use(cors());

app.use('/api/auth', authRouter);  // endpoints: /api/auth/register etc.


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
