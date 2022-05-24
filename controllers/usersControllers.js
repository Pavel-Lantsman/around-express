const User = require('../models/userModel');
const {
  NOT_FOUND,
  INVALID_DATA,
  DEFAULT_ERROR,
  createNotFoundError,
} = require('../utils/errors');

// Get full users list
const getAllUsers = (req, res) => {
  User.find({})
    .orFail(createNotFoundError)
    .then((usersData) => res.status(200).send(usersData))
    .catch((err) => {
      if (err.name === 'Not Found') {
        res.status(NOT_FOUND).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

// Get user by ID
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(createNotFoundError)
    .then((User) => res.status(200).send(User))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ message: err.message });
        return;
      } if (err.name === 'Not Found') {
        res.status(NOT_FOUND).send({ message: err.message });
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

// Create a new user
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(() => {
      res.status(200).send({ message: 'user created successfully' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(createNotFoundError)
    .then((updatedUser) => {
      res.status(200).send({ message: `User ${updatedUser} updated successfully` });
    })
    .catch((err) => {
      if (err.name === 'Not Found') {
        res.status(NOT_FOUND).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const updateAvatar = (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, avatar, { new: true, runValidators: true })
    .orFail(createNotFoundError)
    .then(() => {
      res.status(200).send({ message: 'Avatar updated successfully' });
    })
    .catch((err) => {
      if (err.name === 'Not Found') {
        res.status(NOT_FOUND).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
}
