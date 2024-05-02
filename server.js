// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path:'.env-local' });

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quotes', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

// Central API route prefix
app.use('/api', require('./src/routes/authRoutes'));
app.use('/api', require('./src/routes/quoteRoutes'));

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
