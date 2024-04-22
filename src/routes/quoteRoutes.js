// routes/quoteRoutes.js
const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.post('/quotes', quoteController.createQuote);
router.get('/quotes', quoteController.getQuotes);
router.delete('/quotes/:quoteId', quoteController.deleteQuote);

module.exports = router;
