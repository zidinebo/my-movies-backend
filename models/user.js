const mongoose = require("mongoose");
// Imports Mongoose, which is used to interact with MongoDB and define data schemas/models.

const userSchema = new mongoose.Schema({
  email: {
    // Defines the `email` field for the `User` schema, which stores the user's email.

    type: String,
    // Specifies that the `email` field should be of type `String`.

    unique: true,
    // Ensures that each user has a unique email, preventing duplicate email addresses in the database.

    required: true,
    // Marks the `email` field as required, meaning a user document cannot be saved without this field.

    match: [
      // Provides a regular expression (regex) to validate that the `email` is in the correct format.

      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
      // This regex ensures the email address follows a typical format (e.g., user@example.com).

      "Please Provide a valid email",
      // Custom error message to be shown if the provided email does not match the regex pattern.
    ],
  },

  password: {
    // Defines the `password` field for the `User` schema, which stores the user's password.

    type: String,
    // Specifies that the `password` field should be of type `String`.

    required: true,
    // Marks the `password` field as required, meaning a user document cannot be saved without this field.
  },
});

module.exports = mongoose.model("User", userSchema);
// Exports the model named `User`, which is based on the `userSchema`.
// This allows other parts of the application to interact with the `User` collection in MongoDB.
