const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/usersControllers');

// Get full users list
router.get('/users', getAllUsers);

// Get user by id
router.get('/users/:userId', getUserById);

// Create a new user
router.post('/users', createUser);

// Update users
router.patch('/users/me', updateUser);

// Update avatar
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
