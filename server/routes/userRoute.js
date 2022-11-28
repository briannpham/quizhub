const express = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', userController.register, (req, res) => {
  return res.status(200).json(res.locals.user);
});


router.post('/login', userController.login, (req, res) => {
  return res.status(200).json(res.locals.user);
});


router.post('/me', authMiddleware.protect, userController.getMe, (req, res) => {
  return res.status(200).json(res.locals.user);
});

module.exports = router;