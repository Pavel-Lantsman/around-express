const NOT_FOUND = 404;
const INVALID_DATA = 400;
const DEFAULT_ERROR = 500;

const createNotFoundError = () => {
  const error = new Error('No available data to display');
  error.name = 'Not Found';
  error.statusCode = NOT_FOUND;
  throw error;
};

const errorHandler = (err, req, res) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(INVALID_DATA).send({ message: err.message });
    return;
  }
  if (err.name === 'Not Found') {
    res.status(NOT_FOUND).send({ message: err.message });
    return;
  }
  res.status(DEFAULT_ERROR).send({ message: err.message });
};

module.exports = {
  NOT_FOUND,
  INVALID_DATA,
  DEFAULT_ERROR,
  createNotFoundError,
  errorHandler,
};
