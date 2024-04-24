// routes/quoteRoutes.js
const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.post('/quotes', quoteController.createQuote);
router.get('/quotes', quoteController.getQuotes);
router.get('/quotes/random', quoteController.getRandomQuote);  // Add this line for random quotes
router.delete('/quotes/:quoteId', quoteController.deleteQuote);
router.put('/quotes/:id/like', quoteController.likeQuote);
router.put('/quotes/:id/unlike', quoteController.unlikeQuote); 
router.get('/quotes/byUser/:username', quoteController.getQuotesByUsername);
router.get('/top-quotes', quoteController.getTopQuotes);
router.put('/quotes/:quoteId', quoteController.updateQuote);

module.exports = router;