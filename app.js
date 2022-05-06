const express = require('express');
const app = express();
const path = require('path');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const notFoundRouter = require('./routes/notFound');

const { PORT = 3000} = process.env;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded, the traditional GET form data format

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', notFoundRouter);



app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
});
