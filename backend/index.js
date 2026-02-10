
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/User');

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json()); 

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      message: 'User registered successfully',
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
