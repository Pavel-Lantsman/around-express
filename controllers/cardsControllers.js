const Card = require('../models/cardModel');
const {
  NOT_FOUND,
  INVALID_DATA,
  DEFAULT_ERROR,
  createNotFoundError,
} = require('../utils/errors');

// Get all cards data
const getAllCards = (req, res) => {
  Card.find({})
    .orFail(createNotFoundError)
    .then((cardsData) => {
      res.status(200).send(cardsData);
    })
    .catch((err) => {
      if (err.name === 'Not Found') {
        res.status(NOT_FOUND).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

// Create a new card
const createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then(() => {
      res.status(200).send({ message: 'card created successfully' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

// Delete card
const deleteCard = (req, res) => {
  const { cardId } = req.user._id;
  Card.deleteOne(cardId)
    .orFail(createNotFoundError)
    .then(() => {
      res.status(200).send('card has been deleted successfully');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ message: err.message });
      }
      if (err.name === 'Not Found') {
        res.status(NOT_FOUND).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
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
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ message: err.message });
        return;
      } if (err.name === 'Not Found') {
        res.status(NOT_FOUND).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
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
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ message: err.message });
        return;
      } if (err.name === 'Not Found') {
        res.status(NOT_FOUND).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
}
