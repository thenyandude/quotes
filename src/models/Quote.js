const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quoteText: { type: String, required: true },
    origin: { type: String, required: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the quote
    created: { type: Date, default: Date.now }
});


const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
