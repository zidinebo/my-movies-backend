const express = require("express");
// Imports the Express library, which is used to create the router and handle HTTP requests.

const { register, login, getUser } = require("../controllers/authController");
// Destructures and imports `register`, `login`, and `getUser` functions from the `authController` module. These are the controller functions for handling authentication routes.

const methodNotAllowed = require("../utils/methodNotAllowed");
// Imports a utility function for handling HTTP methods that are not allowed.

const auth = require("../middleware/auth");
// Imports the `auth` middleware function, which is used for route protection and authentication.

const router = express.Router();
// Creates a new Express router instance to define routes for authentication.

router
  .route("/register")
  .post(register)
  // Defines a POST route for "/register" that uses the `register` controller function to handle user registration.
  .all(methodNotAllowed);
// Uses `methodNotAllowed` middleware to handle any HTTP methods other than POST on the "/register" route, returning a 405 Method Not Allowed error.

router
  .route("/login")
  .post(login)
  // Defines a POST route for "/login" that uses the `login` controller function to handle user login.
  .all(methodNotAllowed);
// Uses `methodNotAllowed` middleware to handle any HTTP methods other than POST on the "/login" route, returning a 405 Method Not Allowed error.

router
  .route("/user")
  .post(auth, getUser)
  // Defines a POST route for "/user" that first applies the `auth` middleware to ensure the user is authenticated, then uses the `getUser` controller function to handle retrieving user information.
  .all(methodNotAllowed);
// Uses `methodNotAllowed` middleware to handle any HTTP methods other than POST on the "/user" route, returning a 405 Method Not Allowed error.

module.exports = router;
// Exports the router instance so it can be used in other parts of the application (e.g., in the main app file to mount the routes).
