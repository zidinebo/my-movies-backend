const express = require("express");
// Imports the Express library, which is used to create the router and handle HTTP requests.

const methodNotAllowed = require("../utils/methodNotAllowed");
// Imports a utility function for handling HTTP methods that are not allowed.

const {
  allData,
  allSeries,
  allMovies,
} = require("../controllers/movieController");
// Destructures and imports `allData`, `allSeries`, and `allMovies` functions from the `movieController` module. These are the controller functions for handling movie-related routes.

const router = express.Router();
// Creates a new Express router instance to define routes for retrieving movie data.

router
  .route("/")
  .get(allData)
  // Defines a GET route for "/" that calls the `allData` controller function to handle retrieving all movie data.
  .all(methodNotAllowed);
// Uses `methodNotAllowed` middleware to handle any HTTP methods other than GET on the "/" route, returning a 405 Method Not Allowed error.

router
  .route("/series")
  .get(allSeries)
  // Defines a GET route for "/series" that calls the `allSeries` controller function to handle retrieving all series data.
  .all(methodNotAllowed);
// Uses `methodNotAllowed` middleware to handle any HTTP methods other than GET on the "/series" route, returning a 405 Method Not Allowed error.

router
  .route("/movies")
  .get(allMovies)
  // Defines a GET route for "/movies" that calls the `allMovies` controller function to handle retrieving all movies data.
  .all(methodNotAllowed);
// Uses `methodNotAllowed` middleware to handle any HTTP methods other than GET on the "/movies" route, returning a 405 Method Not Allowed error.

module.exports = router;
// Exports the router instance so it can be used in other parts of the application (e.g., in the main app file to mount the routes).
