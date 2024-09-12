require("dotenv").config();
// Loads environment variables from a `.env` file into `process.env`.
// This allows sensitive data like DB connection strings or API keys to be securely stored.

const express = require("express");
// Imports the Express framework, which is used to create a web server.

const mongoose = require("mongoose");
// Imports Mongoose, which is an ODM (Object Data Modeling) library for MongoDB.

const cors = require("cors");
// Imports the `cors` middleware to enable Cross-Origin Resource Sharing.
// This allows the API to be accessed by front-end clients on different domains.

const authRouter = require("./routes/authRouter");
// Imports the router that handles authentication-related routes (e.g., login, signup).

const movieRouter = require("./routes/movieRouter");
// Imports the router that handles movie-related routes (e.g., fetching movies).

const bookmarkRouter = require("./routes/bookmarkRouter");
// Imports the router that handles bookmark-related routes (e.g., saving/removing bookmarks).

const errorMiddleware = require("./middleware/error");
// Imports custom error-handling middleware, used to handle errors globally in the application.

const app = express();
// Initializes an instance of an Express application.

const port = process.env.PORT || 3000;
// Retrieves the port number from environment variables or defaults to 3000 if not set.

const corsOptions = {
  origin: "*",
  // Allows all domains to access the API (wildcard "*"). For production, you might restrict this to specific domains.

  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // Specifies which HTTP methods are allowed in cross-origin requests.

  credentials: true,
  // Indicates whether the response to the request can be exposed when credentials are included in the request.

  optionsSuccessStatus: 204,
  // Sets the success status for OPTIONS preflight requests (a requirement for some browsers).
};

app.use(cors(corsOptions));
// Enables CORS with the specified options for handling cross-origin requests.

app.use(express.json());
// Adds built-in middleware to parse incoming requests with JSON payloads.

app.use("/api/auth", authRouter);
// Routes requests starting with `/api/auth` to the `authRouter` for handling authentication actions.

app.use("/api/movie", movieRouter);
// Routes requests starting with `/api/movie` to the `movieRouter` for handling movie-related actions.

app.use("/api/bookmark", bookmarkRouter);
// Routes requests starting with `/api/bookmark` to the `bookmarkRouter` for handling bookmark-related actions.

app.use(errorMiddleware);
// Registers the error handling middleware to process errors that occur in the application.

const start = async () => {
  // Defines an async function `start` to initialize the server and handle async operations like DB connection.

  try {
    await mongoose.connect(process.env.MONGO_URI);
    // Attempts to connect to the MongoDB database using the URI stored in environment variables.

    console.log("Database Connected");
    // Logs a success message when the database connection is successful.

    await app.listen(port);
    // Starts the Express server and listens on the specified port.

    console.log(`Server is listening on PORT: ${port}`);
    // Logs a message indicating that the server is up and running on the specified port.
  } catch (err) {
    // Catches any errors that occur during the database connection or server startup.

    console.error("Unable to Connect to the Database:", err.message);
    // Logs an error message if there is an issue connecting to the database.

    process.exit(1);
    // Exits the process with an error code of 1 (indicating a failure).
  }
};

start();
// Calls the `start` function to initiate the server and database connection.
