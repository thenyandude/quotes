// routes/quoteRoutes.js
const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.post('/quotes', quoteController.createQuote);
router.get('/quotes', quoteController.getQuotes);
router.delete('/quotes/:quoteId', quoteController.deleteQuote);
router.put('/quotes/:id/like', quoteController.likeQuote);
router.put('/quotes/:id/unlike', quoteController.unlikeQuote); 

module.exports = router;