const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const usersData = path.join(__dirname, '..', 'data', 'users.json');

// Get File Content and Read It
const getFileContent = (path) => {
  return fs.readFile(path, {encoding: 'utf-8'})
    .then(JSON.parse)
    .catch((err) => console.log(err));
};

// Get All Users
const getUsers = (req, res) => {
  getFileContent(usersData)
    .then((users) => {
      res.status(200).send(users);
    });
};

// Get User By ID
const getSingleUser = (req, res) => {
  getFileContent(usersData)
    .then((users) => {
      const user = users.find((user) => user._id === req.params.id);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({"message": "User ID not found"});
    });
};


router.get('/users', getUsers);
router.get('/users/:id', getSingleUser);

module.exports = router;





