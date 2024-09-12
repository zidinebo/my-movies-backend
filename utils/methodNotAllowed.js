const methodNotAllowed = (req, res) => {
  // Defines a function named `methodNotAllowed` that handles requests using HTTP methods that are not supported for a particular route.

  console.log(req);
  // Logs the entire request object to the console. This can be useful for debugging to see details of the request that caused the error.

  res.sendStatus(405).json({
    // Sends a 405 Method Not Allowed HTTP status code.
    // The `json` method is used to send a JSON response with the error message.

    message: `Method ${req.method} not allowed on ${req.originalUrl}`,
    // Constructs a message indicating that the HTTP method used (e.g., GET, POST) is not allowed for the requested URL.
    // `req.method` contains the HTTP method of the request.
    // `req.originalUrl` contains the original URL of the request.
  });
};

module.exports = methodNotAllowed;
// Exports the `methodNotAllowed` function so it can be used as middleware in other parts of the application to handle unsupported HTTP methods.
