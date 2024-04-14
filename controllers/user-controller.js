const Dot = require('dot-object');
const dotObject = new Dot('.', false, true, false);
const database = require('../database');
const { NotFound } = require('../common/errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = database.model('User');

exports.postUser = async (req, res, next) => {

  try {
    // Create new User instance from payload.
    const newUser = new User(req.body);

    // Validate user input
    if (!(req.body.first_name && req.body.last_name && req.body.username && req.body.password)){
       res.status(400).send("Input all required fields")
    }

    // Check if  an user exist in our system
    const curentUser = await User.findOne({ username: req.body.username });

    if (curentUser) {
       return res.status(409).send("User already exists")
    }

     // Encrypt user password
     const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //console.log('encryptedPassword: ', hashedPassword)

    // Create token
    const token = jwt.sign(
      { user_id: newUser._id, username: newUser.username },
      process.env.TOKEN_KEY,
      {
        expiresIn:"1h"
      }
    )

    // Save user token
    newUser.token =token;

    // Assign the hashed password to the user object
    newUser.password = hashedPassword;

    // Insert a User document into database.
    const savedUser = await newUser.save();
    // Send the saved User to the client.
    res.status(201).json(savedUser);

  } catch (err) {
    // Pass to error handler.
    next(err);
  }
};


exports.postLogin = async (req, res, next) => {
  try {
    // Validate user input
    if (!(req.body.username && req.body.password)) {
      return res.status(400).send("Input all required fields");
    }

    // Check if a user exists in our system
    const user = await User.findOne({ username: req.body.username });

    // Passwords match, proceed with login
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username: user.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      // Save user token
      user.token = token;

      res.status(200).json(user);
    } else {
      // Invalid username or password
      res.status(400).send("Invalid username or password");
    }
  } catch (err) {
    // Pass to error handler.
    next(err);
  }
};


exports.getUsers = async (req, res, next) => {
  try {
    // The filter, fields, paging by prev middleware.
    const { filter, fields, options } = req;
    // Find and count User documents by query string.
    const results = await Promise.all([
      User.countDocuments(filter),
      User.find(filter, fields, options),
    ]);
    // Send array of User to the client.
    res.status(200).json({
      total: results[0],
      page: options.skip / options.limit || 0,
      data: results[1],
    });

  } catch (err) {
    // Pass to error handler.
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    // Find a User document by User ID.
    const existUser = await User.findById(req.params.userId);
    // The resource could not be found?
    if (!existUser) throw new NotFound('The resource could not be found.');
    // Send the User to the client.
    res.status(200).json(existUser);

  } catch (err) {
    // Pass to error handler.
    next(err);
  }
};

exports.putUser = async (req, res, next) => {
  try {
    // Remove all non-data properties from object.
    // req.body = cleanEmptyProps(req.body);
    // Transform object to dot notation for mongoose.
    req.body = dotObject.dot(req.body);
    // Find and update User document by User ID. (OVERWRITES the Permissions Array)
    const updatedUser = await User.findByIdAndUpdate(req.params.userId,
      req.body, { runValidators: true, new: true, overwrite: true });
    // The resource could not be found?
    if (!updatedUser) throw new NotFound('The resource could not be found.');
    // Send the updated User to the client.
    res.status(200).json(updatedUser);

  } catch (err) {
    // Pass to error handler.
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    // Find and delete User document by User ID.
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    // The resource could not be found?
    if (!deletedUser) throw new NotFound('The resource could not be found.');
    // Send 204 no content to the client.
    res.sendStatus(204);

  } catch (err) {
    // Pass to error handler.
    next(err);
  }
};
