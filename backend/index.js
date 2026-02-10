const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(express.json())

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB Atlas connected'))
  .catch(err => console.error(' MongoDB connection error:', err))

app.get('/', (req, res) => {
  res.send('MongoDB Atlas connected ')
})

app.listen(port, () => {
  console.log(` Server running on port ${port}`)
})
