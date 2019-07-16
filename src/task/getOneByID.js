const Task = require("../models/Task");
const userHelper = require("../utils/userHelper");
const {
  unauthorizedUserResponse,
  notFoundResponse
} = require("../utils/errorResponsesHelper");

module.exports = async ({ id, prismicConnection, userUID }) => {
  //check if user has permission to create tasks
  const user = await userHelper({ prismicConnection, userUID });

  //if no user or permisson -> 401 unauthorized
  if (!user) return unauthorizedUserResponse();

  const task = await Task.findById(id);

  // error -> 404
  if (!task) return notFoundResponse();

  // success
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    },
    body: JSON.stringify({ success: true, task })
  };
};
