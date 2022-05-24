const mongoose = require('mongoose');
const user = require('./userModel');

// eslint-disable-next-line no-useless-escape
const linkRegex = /^https?:\/\/(www\.)?[A-Za-z\d-.]+\.[A-Za-z\d-.]+[A-Za-z\d-._~:?%#@!$&'()*+,;=\/\[\]]*$/i;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (value) => linkRegex.test(value),
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
