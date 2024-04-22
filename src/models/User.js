const mongoose = require('mongoose');

// Definerer en Mongoose-modell for brukere
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  const User = mongoose.model('User', userSchema);

module.exports = User;