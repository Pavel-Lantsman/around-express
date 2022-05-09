const express = require('express');
const fsPromises = require('fs').promises;
const path = require('path');

const router = express.Router();
const cardsData = path.join(__dirname, '..', 'data', 'cards.json');

// Get File Content and Read It
const getFileData = (filePath, res) => fsPromises
  .readFile(filePath, { encoding: 'utf8' })
  .then((data) => JSON.parse(data))
  .catch((err) => {
    res.status(500).send({ message: err });
  });

// Get All Cards
const getCards = (req, res) => getFileData(cardsData, res)
  .then((cards) => {
    res.status(200).send(cards);
  });

router.get('/cards', getCards);

module.exports = router;
