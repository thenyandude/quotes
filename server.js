// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://10.12.99.10:27017/quotes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

// Central API route prefix
app.use('/api', require('./src/routes/authRoutes'));
app.use('/api', require('./src/routes/quoteRoutes'));

const port = 80;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
