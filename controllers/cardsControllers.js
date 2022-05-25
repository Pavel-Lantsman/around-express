const Card = require('../models/cardModel');
const {
  createNotFoundError,
  errorHandler,
} = require('../utils/errors');

// Get all cards data
const getAllCards = (req, res) => {
  Card.find({})
    .orFail(createNotFoundError)
    .then((cardsData) => {
      res.status(200).send(cardsData);
    })
    .catch(errorHandler);
};

// Create a new card
const createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then(() => {
      res.status(200).send({ message: 'card created successfully' });
    })
    .catch(errorHandler);
};

// Delete card
const deleteCard = (req, res) => {
  const { cardId } = req.user._id;
  Card.deleteOne(cardId)
    .orFail(createNotFoundError)
    .then(() => {
      res.status(200).send('card has been deleted successfully');
    })
    .catch(errorHandler);
};

// Like card
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(createNotFoundError)
    .then((card) => {
      res.status(200).send(card.likes);
    })
    .catch(errorHandler);
};

// Dislike card
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(createNotFoundError)
    .then((card) => {
      res.status(200).send(card.likes);
    })
    .catch(errorHandler);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
