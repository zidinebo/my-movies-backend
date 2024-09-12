const express = require("express");
// Imports the Express library, which is used to create the router and handle HTTP requests.

const methodNotAllowed = require("../utils/methodNotAllowed");
// Imports a utility function for handling HTTP methods that are not allowed.

const {
  allBookmarks,
  addBookmark,
  removeBookmark,
} = require("../controllers/bookmarkController");
// Destructures and imports `allBookmarks`, `addBookmark`, and `removeBookmark` functions from the `bookmarkController` module. These are the controller functions for handling bookmark-related routes.

const auth = require("../middleware/auth");
// Imports the `auth` middleware function, which is used for route protection and authentication.

const router = express.Router();
// Creates a new Express router instance to define routes for managing bookmarks.

router
  .route("/")
  .get(auth, allBookmarks)
  // Defines a GET route for "/" that uses the `auth` middleware to ensure the user is authenticated, then calls the `allBookmarks` controller function to handle retrieving all bookmarks.
  .all(methodNotAllowed);
// Uses `methodNotAllowed` middleware to handle any HTTP methods other than GET on the "/" route, returning a 405 Method Not Allowed error.

router
  .route("/add/:id")
  .get(auth, addBookmark)
  // Defines a GET route for "/add/:id" that uses the `auth` middleware to ensure the user is authenticated, then calls the `addBookmark` controller function to handle adding a bookmark to a movie.
  .all(methodNotAllowed);
// Uses `methodNotAllowed` middleware to handle any HTTP methods other than GET on the "/add/:id" route, returning a 405 Method Not Allowed error.

router
  .route("/remove/:id")
  .get(auth, removeBookmark)
  // Defines a GET route for "/remove/:id" that uses the `auth` middleware to ensure the user is authenticated, then calls the `removeBookmark` controller function to handle removing a bookmark from a movie.
  .all(methodNotAllowed);
// Uses `methodNotAllowed` middleware to handle any HTTP methods other than GET on the "/remove/:id" route, returning a 405 Method Not Allowed error.

module.exports = router;
// Exports the router instance so it can be used in other parts of the application (e.g., in the main app file to mount the routes).
