const express = require('express');
const path = require('path');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const notFoundRouter = require('./routes/notFound');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', notFoundRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
