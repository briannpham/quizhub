const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const userController = {};


// @desc     Register user
// @route:   POST /api/users/
userController.register = async (req, res, next) => {
  try {
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
        message: { err: 'User already exists. ERROR in userController.register' }
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
      return next({
        message: { err: 'Invalid user data. ERROR in userController.register' }
      });
    }

    // Generate token after register
    const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Only serve these fields back to the frontend (i.e. without password)
    res.locals.user = {
      _id: user._id,
      firstName: user.firstName,
      token: token
    };

    return next();
  } catch (error) {
    return res.status(404).json({ message: { err: error.message } });
  }
};


// @desc     Login user
// @route:   POST /api/users/login
userController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({
        message: { err: 'Missing required input fields. ERROR in userController.login' }
      });
    }

    // Check for user email
    const user = await User.findOne({ email });

    if (!user) {
      return next({
        message: { err: 'User does not exist. ERROR in userController.login' }
      });
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
        token: token
      };

      return next();
    } else {
      return next({
        message: { err: 'Invalid email or password. ERROR in userController.login' }
      });
    }

  } catch (error) {
    return res.status(404).json({ message: { err: error.message } });
  }
};


// @desc     Login user
// @route:   POST /api/users/me
userController.getMe = async (req, res, next) => {
  const { _id, firstName, lastName, email } = req.user;
  res.locals.user = { _id, firstName, lastName, email };
  return next();
};


module.exports = userController;