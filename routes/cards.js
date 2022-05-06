const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const cardsData = path.join(__dirname,'..','data', 'cards.json');


// Get File Content and Read It
const getFileContent = (path) => {
  return fs.readFile(path, { encoding: 'utf-8' })
    .then(JSON.parse)
    .catch((err) => console.log(err));
};

// Get All Cards
const getCards = (req, res) => {
  return getFileContent(cardsData)
    .then((cards) => {
      res.status(200).send(cards);
    });
};


router.get('/cards', getCards);

module.exports = router;





