const router = require('express').Router();

const notFound = (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
};

// Non Existing page request
router.get('*', notFound);

module.exports = router;
