const error = (err, req, res, next) => {
  // Defines an error-handling middleware function named `error`.

  res.status(err.status).json({
    // Sets the HTTP response status code to the error's status code.
    // Sends a JSON response containing the error message.

    message: err.message,
    // Includes the error message in the response.
  });
};

module.exports = error;
// Exports the `error` middleware function so it can be used in the Express app to handle errors.
