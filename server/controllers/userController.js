const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const userController = {};


// @desc     Register user
// @route:   POST /api/users/
userController.register = async (req, res, next) => {
  try {
    console.log('Register user in userController.register'.green);

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return next({
        message: { err: 'Missing required input fields. ERROR in userController.register' }
      });
    }

    // Check if user exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return next({
        message: { err: 'User already exists. ERROR in userController.regist' }
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    if (!user) {
      return res.status(404).json({ message: { err: 'Invalid user data' } });
    }

    // Generate token after register
    const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Only serve these fields back to the frontend (i.e. without password)
    res.locals.user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token
    };

    next();
  } catch (error) {
    res.status(404).json({ message: { err: error.message } });
  }
};


// @desc     Login user
// @route:   POST /api/users/login
userController.login = async (req, res, next) => {
  try {
    console.log('Login user in userController.login'.green);
    const { email, password } = req.body;

    if (!email || !password) {
      return next({
        message: { err: 'Missing required input fields. ERROR in userController.login' }
      });
    }

    // Check for user email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: { err: 'User does not exist' } });
    }

    // Compare user's password with req.body.password
    if (await (bcrypt.compare(password, user.password))) {

      // Generate token after login
      const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.locals.user = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: token
      };

      next();
    } else {
      return res.status(400).json({ message: { err: 'Invalid credential' } });
    }

  } catch (error) {
    res.status(404).json({ message: { err: error.message } });
  }
};


// @desc     Login user
// @route:   POST /api/users/me
userController.getMe = async (req, res, next) => {
  console.log('Me in userController.getMe'.green);
  next();
};


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = userController;