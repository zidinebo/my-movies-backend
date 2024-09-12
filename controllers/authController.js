const User = require("../models/user");
// Imports the `User` model, which interacts with the `User` collection in MongoDB.

const bcrypt = require("bcryptjs");
// Imports bcrypt.js for hashing and comparing passwords.

const customError = require("../utils/customError");
// Imports a utility function to create custom errors (likely returning an error object with a message and status code).

const jwt = require("jsonwebtoken");
// Imports jsonwebtoken to generate and verify JWT tokens for user authentication.

const register = async (req, res, next) => {
  // Defines an asynchronous `register` function to handle user registration.

  try {
    const { email, password, repeatPassword } = req.body;
    // Extracts `email`, `password`, and `repeatPassword` from the request body (coming from the client).

    if (!email || !password || password !== repeatPassword) {
      throw customError("Invalid input data", 400);
      // Checks if any field is missing or if passwords don't match, then throws a custom error with a 400 status code.
    }

    const salt = await bcrypt.genSalt(10);
    // Generates a salt for password hashing with a salt rounds value of 10.

    const hashedPassword = await bcrypt.hash(password, salt);
    // Hashes the password using bcrypt and the generated salt.

    const user = await User.create({ email, password: hashedPassword });
    // Creates a new user in the database with the provided email and hashed password.

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    // Generates a JWT token containing the user's ID (`user._id`), signed with the secret from environment variables.
    // The token expires in 3 days.

    res.status(200).json({
      id: user._id,
      token,
    });
    // Sends a success response with status 200, returning the user’s ID and the generated token.
  } catch (error) {
    handleRegistrationError(error, next);
    // Calls the `handleRegistrationError` function to deal with specific registration errors.
  }
};

const login = async (req, res, next) => {
  // Defines an asynchronous `login` function to handle user login.

  try {
    const { email, password } = req.body;
    // Extracts `email` and `password` from the request body (coming from the client).

    if (!email || !password) {
      throw customError("Invalid input data", 400);
      // Checks if either `email` or `password` is missing, then throws a custom error with a 400 status code.
    }

    const user = await User.findOne({ email });
    // Finds the user in the database by the provided email.

    if (!user) {
      throw customError("User does not exist", 400);
      // If no user is found with the provided email, throws a custom error with a 400 status code.
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    // Compares the provided password with the stored (hashed) password in the database.

    if (!isPasswordMatch) {
      throw customError("Wrong Password", 400);
      // If the passwords don't match, throws a custom error indicating the wrong password was provided.
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    // Generates a JWT token containing the user’s ID, signed with the secret, and sets it to expire in 3 days.

    res.status(200).json({
      token,
      id: user._id,
    });
    // Sends a success response with status 200, returning the user’s ID and the generated token.
  } catch (error) {
    handleLoginError(error, next);
    // Calls the `handleLoginError` function to deal with specific login errors.
  }
};

const getUser = (req, res, next) => {
  // Defines a `getUser` function to return the currently authenticated user's details.

  const { userId } = req.user;
  // Extracts `userId` from `req.user` (usually set by authentication middleware).

  res.status(200).json({
    id: userId,
  });
  // Sends a success response with status 200, returning the user’s ID.
};

const handleRegistrationError = (error, next) => {
  // Function to handle errors that occur during the registration process.

  if (error.code === 11000 && error.keyValue.email) {
    next(customError("Email Already Exists", 400));
    // If a user tries to register with an email that already exists, returns a custom error with a 400 status.
  } else if (error.errors && error.errors.email && error.errors.email.message) {
    next(customError(error.errors.email.message, 400));
    // If there's a specific validation error with the email, passes the custom validation message and a 400 status.
  } else {
    next(customError("Something went wrong", 500));
    // For other generic errors, throws a custom error with a 500 (internal server error) status.
  }
};

const handleLoginError = (error, next) => {
  // Function to handle errors that occur during the login process.

  if (
    error.message === "User does not exist" ||
    error.message === "Wrong Password"
  ) {
    next(customError(error.message, 400));
    // If the error is due to an invalid user or password, returns the appropriate error message with a 400 status.
  } else {
    next(customError("Something went wrong", 500));
    // For other generic errors, throws a custom error with a 500 (internal server error) status.
  }
};

module.exports = { register, login, getUser };
// Exports the `register`, `login`, and `getUser` functions so they can be used in other parts of the application.
