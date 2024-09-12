const Movie = require("../models/movies");
// Imports the `Movie` model to interact with the `Movies` collection in MongoDB.

const customError = require("../utils/customError");
// Imports a custom error utility for error handling (likely creates an error with a message and status code).

const allData = async (req, res, next) => {
  // Defines an asynchronous function `allData` to handle fetching all movies and series data.

  try {
    const data = await Movie.find({});
    // Retrieves all documents from the `Movies` collection using `Movie.find({})` (no filter, so it fetches all movies and series).

    res.status(200).json({ data });
    // Sends a success response with status 200 and returns all the retrieved data in the response.
  } catch (error) {
    next(customError("Error fetching all data", 500));
    // If an error occurs, it passes a custom error to the error-handling middleware with a message and status code 500.
  }
};

const allSeries = async (req, res, next) => {
  // Defines an asynchronous function `allSeries` to handle fetching only series data.

  try {
    const series = await Movie.find({ type: "series" });
    // Finds all documents in the `Movies` collection where the `type` field is "series".

    res.status(200).json({ data: series });
    // Sends a success response with status 200 and returns the retrieved series data in the response.
  } catch (error) {
    next(customError("Error fetching series data", 500));
    // If an error occurs, it passes a custom error to the error-handling middleware with a message and status code 500.
  }
};

const allMovies = async (req, res, next) => {
  // Defines an asynchronous function `allMovies` to handle fetching only movie data.

  try {
    const movies = await Movie.find({ type: "movie" });
    // Finds all documents in the `Movies` collection where the `type` field is "movie".

    res.status(200).json({ data: movies });
    // Sends a success response with status 200 and returns the retrieved movie data in the response.
  } catch (error) {
    next(customError("Error fetching movies data", 500));
    // If an error occurs, it passes a custom error to the error-handling middleware with a message and status code 500.
  }
};

module.exports = { allData, allSeries, allMovies };
// Exports the three functions (`allData`, `allSeries`, `allMovies`) so they can be used in routing.
