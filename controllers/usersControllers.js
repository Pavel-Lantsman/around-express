const User = require('../models/userModel');
const {
  createNotFoundError,
  errorHandler,
} = require('../utils/errors');

// Get full users list
const getAllUsers = (req, res) => {
  User.find({})
    .orFail(createNotFoundError)
    .then((usersData) => res.status(200).send(usersData))
    .catch(errorHandler);
};

// Get user by ID
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(createNotFoundError)
    .then((user) => res.status(200).send(user))
    .catch(errorHandler);
};

// Create a new user
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(() => {
      res.status(200).send({ message: 'user created successfully' });
    })
    .catch(errorHandler);
};

const updateUser = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(createNotFoundError)
    .then((updatedUser) => {
      res.status(200).send({ message: `User ${updatedUser} updated successfully` });
    })
    .catch(errorHandler);
};

const updateAvatar = (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, avatar, { new: true, runValidators: true })
    .orFail(createNotFoundError)
    .then(() => {
      res.status(200).send({ message: 'Avatar updated successfully' });
    })
    .catch(errorHandler);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
