const jwt = require("jsonwebtoken");
// Imports the `jsonwebtoken` library, which is used to sign and verify JWT tokens.

const customError = require("../utils/customError");
// Imports the custom error utility to create standardized error messages with status codes.

const extractToken = (authHeader) => {
  // Defines the `extractToken` function to extract the token from the authorization header.

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Checks if the `Authorization` header is missing or does not start with "Bearer ".

    throw customError("No Token Provided", 401);
    // If the token is missing or invalid, throws a custom error with a 401 status (Unauthorized).
  }

  return authHeader.split(" ")[1];
  // Splits the `Authorization` header value (e.g., "Bearer <token>") and returns the token part (after "Bearer ").
};

const auth = (req, res, next) => {
  // Defines the `auth` middleware function to authenticate incoming requests.

  try {
    const token = extractToken(req.headers.authorization);
    // Extracts the token from the `Authorization` header using the `extractToken` function.

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Verifies the token using the JWT secret key stored in the environment variables.
    // If valid, the `payload` contains the decoded token data (e.g., `userId`).

    req.user = { userId: payload.userId };
    // Adds the `userId` from the token's payload to the `req` object for future use in the request lifecycle.

    next();
    // Calls the `next` function to pass control to the next middleware or route handler.
  } catch (error) {
    return next(customError("Unauthorized", 401));
    // If an error occurs (e.g., invalid or expired token), passes a custom "Unauthorized" error with status 401 to the error handler.
  }
};

module.exports = auth;
// Exports the `auth` middleware function so it can be used to protect routes that require authentication.
