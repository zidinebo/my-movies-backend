const Movie = require("../models/movies");
// Imports the `Movie` model, which interacts with the `Movies` collection in MongoDB.

const customError = require("../utils/customError");
// Imports a utility function to create custom errors (likely returning an error object with a message and status code).

const allBookmarks = async (req, res) => {
  // Defines an asynchronous function `allBookmarks` to handle the retrieval of all movies bookmarked by a user.

  const { userId } = req.user;
  // Extracts the `userId` from the authenticated user (set by middleware, typically from a JWT token).

  const bookmarks = await Movie.find({ bookmarkedBy: userId });
  // Finds all movies in the `Movies` collection where the `bookmarkedBy` field includes the `userId`.

  res.status(200).json({
    data: bookmarks,
    // Sends a success response with status 200, returning the movies that the user has bookmarked.
  });
};

const addBookmark = async (req, res, next) => {
  // Defines an asynchronous function `addBookmark` to handle the addition of a bookmark by a user.

  const { id } = req.params;
  // Extracts the movie ID from the request parameters (URL path).

  const { userId } = req.user;
  // Extracts the `userId` from the authenticated user.

  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      // Finds the movie in the `Movies` collection by its `_id` field (the movie ID).
      { $push: { bookmarkedBy: userId } }
      // Uses MongoDB's `$push` operator to add the `userId` to the `bookmarkedBy` array of the movie.
    );

    if (!movie) {
      throw customError(`No Movie with ID:${id}`, 400);
      // If no movie is found with the provided ID, throws a custom error with a 400 status.
    }

    res.status(200).json({
      message: "Movie Bookmarked!",
      // Sends a success response with status 200, confirming that the movie has been bookmarked.
    });
  } catch (error) {
    next(error);
    // Passes any caught errors to the error-handling middleware.
  }
};

const removeBookmark = async (req, res, next) => {
  // Defines an asynchronous function `removeBookmark` to handle the removal of a bookmark by a user.

  const { id } = req.params;
  // Extracts the movie ID from the request parameters (URL path).

  const { userId } = req.user;
  // Extracts the `userId` from the authenticated user.

  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      // Finds the movie in the `Movies` collection by its `_id` field (the movie ID).
      { $pull: { bookmarkedBy: userId } }
      // Uses MongoDB's `$pull` operator to remove the `userId` from the `bookmarkedBy` array of the movie.
    );

    if (!movie) {
      throw customError(`No Movie with ID:${id}`, 400);
      // If no movie is found with the provided ID, throws a custom error with a 400 status.
    }

    res.status(200).json({
      message: "Bookmark Removed!",
      // Sends a success response with status 200, confirming that the bookmark has been removed.
    });
  } catch (error) {
    next(error);
    // Passes any caught errors to the error-handling middleware.
  }
};

module.exports = { allBookmarks, addBookmark, removeBookmark };
// Exports the `allBookmarks`, `addBookmark`, and `removeBookmark` functions so they can be used in the routing.
