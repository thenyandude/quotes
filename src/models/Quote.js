const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quoteText: String,
    created: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]  // Array of user IDs who liked the quote
});

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
