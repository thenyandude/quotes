// controllers/quoteController.js
const Quote = require('../models/Quote');
const User = require('../models/User');

exports.createQuote = async (req, res) => {
  try {
    const { userId, quoteText } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const newQuote = new Quote({ userId, quoteText });
    await newQuote.save();
    res.status(201).send({ message: 'Quote created', quoteId: newQuote._id });
  } catch (error) {
    res.status(500).send({ message: 'Error creating quote' });
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().populate('userId', 'username').sort({ created: -1 });
    res.status(200).send(quotes);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching quotes' });
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    const { quoteId } = req.params; // Ensure you extract quoteId from params
    const deletedQuote = await Quote.findByIdAndDelete(quoteId);
    if (!deletedQuote) {
      return res.status(404).send({ message: 'Quote not found' });
    }
    res.status(200).send({ message: 'Quote deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting quote' });
  }
};
