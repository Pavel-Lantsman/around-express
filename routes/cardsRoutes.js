const router = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardsControllers');

// Get full cards list
router.get('/cards', getAllCards);

// Create a new card
router.post('/cards', createCard);

// Delete a card
router.delete('/cards/:cardId', deleteCard);

// Add like to card
router.put('/cards/:cardId/likes', likeCard);

// Dislike card
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
