// controllers/quoteController.js
const Quote = require('../models/Quote');
const User = require('../models/User');

exports.createQuote = async (req, res) => {
  try {
    const { userId, quoteText, origin } = req.body; // Destructure origin from req.body
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const newQuote = new Quote({
      userId,
      quoteText,
      origin // Include origin when creating a new quote
    });
    await newQuote.save();
    res.status(201).send({ message: 'Quote created', quote: newQuote }); // Send the new quote back
  } catch (error) {
    res.status(500).send({ message: 'Error creating quote', error });
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const userId = req.query.userId; // Get the userId from query parameters
    // Filter quotes by userId if it's provided
    const query = userId ? { userId: userId } : {};
    const quotes = await Quote.find(query).populate('userId', 'username').sort({ created: -1 });
    res.status(200).send(quotes);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching quotes', error });
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


exports.likeQuote = async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId; // Assuming userId is validated to exist

  try {
      const quote = await Quote.findById(id);
      if (quote.likes.includes(userId)) {
          return res.status(400).send({ message: 'You have already liked this quote' });
      }
      quote.likes.push(userId);
      await quote.save();
      res.status(200).send({ message: 'Quote liked' });
  } catch (error) {
      res.status(500).send({ message: 'Error liking quote', error });
  }
};

exports.unlikeQuote = async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId;  // This should be a validated userId from the client or session

  try {
      const quote = await Quote.findById(id);
      if (!quote) {
          return res.status(404).send({ message: 'Quote not found' });
      }

      const index = quote.likes.indexOf(userId);
      if (index === -1) {
          return res.status(400).send({ message: 'You have not liked this quote' });
      }

      // Remove the user from the likes array
      quote.likes.splice(index, 1);
      await quote.save();
      res.status(200).send({ message: 'Like removed' });
  } catch (error) {
      res.status(500).send({ message: 'Error unliking the quote', error });
  }
};

exports.getQuotesByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username }); // Assuming usernames are unique
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const quotes = await Quote.find({ userId: user._id }).sort({ created: -1 });
    res.status(200).send(quotes);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching quotes', error });
  }
};
