const customError = (message, status) => {
  // Defines a function named `customError` that creates a custom error object with a message and status code.

  return {
    // Returns an object with the following properties:

    message,
    // The error message that provides details about the error.

    status,
    // The HTTP status code associated with the error.
  };
};

module.exports = customError;
// Exports the `customError` function so it can be used in other parts of the application to create custom error objects.
