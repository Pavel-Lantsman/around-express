const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const usersRouter = require('./routes/usersRoutes');
const cardsRouter = require('./routes/cardsRoutes');
const notFoundRouter = require('./routes/notFound');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '628c868947dedaceb632d3e1',
  };

  next();
});

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', notFoundRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
