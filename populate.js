require("dotenv").config();
// Loads environment variables from a `.env` file into `process.env` to access values like MongoDB URI.

const mongoose = require("mongoose");
// Imports Mongoose, which is used to interact with MongoDB.

const Movie = require("./models/movies");
// Imports the `Movie` model, which is a schema that represents the structure of the movie documents in MongoDB.

const movieJson = require("./movies.json");
// Loads the JSON file (`movies.json`) containing movie data that will be uploaded to the database.

const start = async () => {
  // Defines an async function `start` to handle asynchronous tasks such as database connection and data uploading.

  try {
    await mongoose.connect(process.env.MONGO_URI);
    // Attempts to establish a connection to the MongoDB database using the URI from the environment variables.

    console.log("Database Connected");
    // Logs a message indicating a successful connection to the database.

    console.log("Deleting previous records...");
    // Logs a message to indicate the deletion of previous movie records from the database is about to start.

    await Movie.deleteMany();
    // Deletes all existing records/documents from the `Movie` collection in the database.

    console.log("Previous records deleted successfully");
    // Logs a message indicating that the previous movie records have been successfully deleted.

    console.log("Uploading new records...");
    // Logs a message to indicate the uploading of new movie records is about to start.

    await Movie.create(movieJson);
    // Inserts the new movie data (from the `movies.json` file) into the `Movie` collection in the database.

    console.log(movieJson);
    // Logs the movie data being uploaded for visibility/debugging purposes.

    console.log("Movies uploaded successfully");
    // Logs a success message after all movies have been successfully uploaded to the database.

    process.exit(0);
    // Exits the process with code `0`, indicating that the script completed successfully.
  } catch (error) {
    // Catches any errors that occur during the database connection or data upload process.

    console.error("Error:", error.message);
    // Logs the error message if something goes wrong.

    console.log("Unable to connect");
    // Logs an additional message to indicate a failure to connect to the database.

    process.exit(1);
    // Exits the process with code `1`, indicating that the script failed due to an error.
  }
};

start();
// Calls the `start` function to begin the database connection, deletion, and upload process.
