const express = require('express');
const mongoose = require('mongoose');
const config = require('./db/config');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
mongoose.connect(config.mongoURI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));



 

app.post('/regester', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});
