const Notification = require("../models/Notification");
const userHelper = require("../utils/userHelper");
const {
  unauthorizedUserResponse,
  internalErrorResponse,
  validationErrorResponse
} = require("../utils/errorResponsesHelper");

module.exports = async ({ body, id, prismicConnection, userUID }) => {
  //check if user has permission to create tasks
  const user = await userHelper({ prismicConnection, userUID });

  //if no user or permisson -> 401 unauthorized
  if (!user) return unauthorizedUserResponse();

  const { title, type } = body;

  //check if err
  let err = {};
  if (!title || title.length === 0) err.title = "Title is required.";
  if (!type || type.length === 0) err.type = "Type is required.";
  if (!id || id.length === 0) err.id = "Task ID is required.";
  if (!userUID || userUID.length === 0) err.userUID = "UserUID is required.";

  //if not empty return 400 and err object
  if (Object.keys(err).length !== 0) return validationErrorResponse({ err });

  const notification = await Notification.create({
    title,
    type,
    taskID: id,
    user
  });

  // error -> 500
  if (!notification) return internalErrorResponse();

  // success
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    },
    body: JSON.stringify({ success: true, notification })
  };
};
