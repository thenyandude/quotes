const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quoteText: String, // Changed from 'content' to 'quoteText' to better represent the data
    created: { type: Date, default: Date.now } // Keeping 'created' to track when the quote was added
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;