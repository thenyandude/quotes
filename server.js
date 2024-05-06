// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Ensures that the .env file is loaded into process.env

const app = express();
app.use(express.json());  // Parses JSON request bodies
app.use(cors());  // Enables CORS for all domains

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB:', err);
});

// Log the MongoDB URI to confirm it is loaded correctly (can be removed in production)
console.log("MongoDB URI: ", process.env.MONGO_URI);

// Central API route prefix
app.use('/api', require('./src/routes/authRoutes'));
app.use('/api', require('./src/routes/quoteRoutes'));

const port = process.env.SERVER_PORT || 3001; // Default to 3000 if PORT is not specified
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
