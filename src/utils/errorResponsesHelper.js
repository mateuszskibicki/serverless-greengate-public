const errorCatchResponse = ({ err }) => ({
  statusCode: 500,
  headers: {
    "Access-Control-Allow-Origin": "*" // Required for CORS support to work
  },
  body: JSON.stringify({
    msg: "Something went wrong.",
    success: false,
    err: err.message
  })
});

const unauthorizedUserResponse = () => ({
  statusCode: 401,
  headers: {
    "Access-Control-Allow-Origin": "*" // Required for CORS support to work
  },
  body: JSON.stringify({
    success: false,
    msg: "Unauthorized."
  })
});

const notFoundResponse = () => ({
  statusCode: 404,
  headers: {
    "Access-Control-Allow-Origin": "*" // Required for CORS support to work
  },
  body: JSON.stringify({
    success: false,
    msg: "Not found."
  })
});

const internalErrorResponse = () => ({
  statusCode: 500,
  headers: {
    "Access-Control-Allow-Origin": "*" // Required for CORS support to work
  },
  body: JSON.stringify({
    success: false,
    msg: "Something went wrong."
  })
});

const validationErrorResponse = ({ err }) => ({
  statusCode: 400,
  headers: {
    "Access-Control-Allow-Origin": "*" // Required for CORS support to work
  },
  body: JSON.stringify({
    success: false,
    msg: "Validation error.",
    err: { ...err }
  })
});

module.exports = {
  errorCatchResponse,
  unauthorizedUserResponse,
  notFoundResponse,
  internalErrorResponse,
  validationErrorResponse
};
