const express = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', userController.register, (req, res) => {
  console.log('Register user in Router'.green);
  console.log(res.locals.user);
  res.status(200).json(res.locals.user);
});


router.post('/login', userController.login, (req, res) => {
  console.log(`${res.locals.user.firstName} ${res.locals.user.lastName} signs in`.green);
  console.log(res.locals.user);
  res.status(200).json(res.locals.user);
});


router.post('/me', authMiddleware.protect, userController.getMe, (req, res) => {
  console.log('Get me in Router'.green);
  console.log(res.locals.user);
  res.status(200).json(res.locals.user);
});

module.exports = router;