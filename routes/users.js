const express = require('express');
const fsPromises = require('fs').promises;
const path = require('path');

const router = express.Router();
const usersData = path.join(__dirname, '..', 'data', 'users.json');

// Get File Content and Read It
const getFileData = (filePath, res) => fsPromises
  .readFile(filePath, { encoding: 'utf8' })
  .then((data) => JSON.parse(data))
  .catch((err) => {
    res.status(500).send({ message: err });
  });

// Get All Users
const getUsers = (req, res) => {
  getFileData(usersData)
    .then((users) => {
      res.status(200).send(users);
    });
};

// Get User By ID
const getSingleUser = (req, res) => {
  getFileData(usersData)
    .then((users) => {
      const user = users.find((userInfo) => userInfo._id === req.params.id);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: 'User ID not found' });
    });
};

router.get('/users', getUsers);
router.get('/users/:id', getSingleUser);

module.exports = router;
