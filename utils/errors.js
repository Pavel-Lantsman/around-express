const NOT_FOUND = 404;
const INVALID_DATA = 400;
const DEFAULT_ERROR = 500;
const createNotFoundError = () => {
  const error = new Error('No available data to display');
  error.name = 'Not Found';
  error.statusCode = NOT_FOUND;
  throw error;
};

module.exports = {
  NOT_FOUND,
  INVALID_DATA,
  DEFAULT_ERROR,
  createNotFoundError,
};
