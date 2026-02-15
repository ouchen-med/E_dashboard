
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const usersRouter = require('./routes/user.route');
const productrouter = require('./routes/product.route');
//imgs:
const path = require('path');


const app = express();
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json()); 

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
  
app.use('/users', usersRouter);
app.use('/products', productrouter)




// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
