const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 3000;

// routers
const cardsRouter = require('./routes/cards.js');

// logger
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} ${moment().format()}`);
  next();
}
app.use(logger);


// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(cors());      // WHAT DOES THIS DO?


// Connect to database
const MONGO_URI = 'mongodb+srv://brpham13:brian123456@cluster0.7jepfh4.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connect to Mongo DB'))
  .catch(err => console.log(err));

// mongoose.set('useFindAndModify', false);


// // basic get request to get index.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// })


// handle request for static files
// app.use(express.static(path.join(__dirname, '../client')));


// define route handlers
app.use('/api/cards', cardsRouter);


// catch-all route handler for any requests to an unknown route
app.use((req, res) => {
  res.status(404).send('404 Errors');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middlzeware error',
    status: 500,
    message: { err: 'An error occurred. In global error handler' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;