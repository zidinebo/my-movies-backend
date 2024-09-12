const mongoose = require("mongoose");
// Imports Mongoose, which is used to define models and interact with MongoDB.

const movieSchema = new mongoose.Schema({
  title: {
    // Defines the `title` field for the movie, which stores the title of the movie.
    type: String,
    // Specifies that the `title` field should be of type `String`.
    required: true,
    // Marks the `title` field as required, meaning a movie document cannot be saved without this field.
  },

  year: {
    // Defines the `year` field for the movie, which stores the release year of the movie.
    type: String,
    // Specifies that the `year` field should be of type `String`.
    // Storing the year as a string allows for flexibility with non-standard year formats.
    required: true,
    // Marks the `year` field as required.
  },

  rated: {
    // Defines the `rated` field, which stores the movie's rating (e.g., PG-13, R).
    type: String,
    // Specifies that the `rated` field should be of type `String`.
    required: true,
    // Marks the `rated` field as required.
  },

  type: {
    // Defines the `type` field, which stores the type of movie or media (e.g., movie, series, etc.).
    type: String,
    // Specifies that the `type` field should be of type `String`.
    required: true,
    // Marks the `type` field as required.
  },

  image: {
    // Defines the `image` field, which stores the URL or path to the movie's image or poster.
    type: String,
    // Specifies that the `image` field should be of type `String`.
    required: true,
    // Marks the `image` field as required.
  },

  bookmarkedBy: {
    // Defines the `bookmarkedBy` field, which stores an array of users who have bookmarked this movie.
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    // The field is an array of MongoDB Object IDs, each referencing a `User` document in the `User` collection.
    default: [],
    // Sets the default value of `bookmarkedBy` to an empty array.
    // If no users have bookmarked the movie, it will remain an empty array.
  },
});

module.exports = mongoose.model("Movies", movieSchema);
// Exports the `Movies` model based on the `movieSchema`.
// This allows other parts of the application to interact with the `Movies` collection in MongoDB.
