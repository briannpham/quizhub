const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const moment = require('moment');

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

// routers
const cardsRouter = require('./routes/cardsRoute.js');
const userRouter = require('./routes/userRoute.js');

// Logging requests to terminal
const logger = (req, res, next) => {
  console.log(`${req.method.yellow}`, `${req.protocol}://${req.get('host').yellow}${req.originalUrl.brightCyan}`, `${moment().format().green}`);
  next();
};
app.use(logger);

// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connect to Mongo DB'))
  .catch(err => console.log(err));


// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());   

// // basic get request to get index.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// })


// handle request for static files
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, '../client')));


// define route handlers
app.use('/api/cards', cardsRouter);
app.use('/api/users', userRouter);


// catch-all route handler for any requests to an unknown route
app.use((req, res) => {
  res.status(404).send('404 Errors');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middlzeware error',
    status: 400,
    message: { err: 'An error occurred. In global error handler' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;