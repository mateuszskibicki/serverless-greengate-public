const Task = require("../models/Task");
const Notification = require("../models/Notification");
const notificationsTypes = require("../utils/notificationsTypes");
const userHelper = require("../utils/userHelper");
const {
  unauthorizedUserResponse,
  internalErrorResponse,
  validationErrorResponse
} = require("../utils/errorResponsesHelper");

module.exports = async ({ id, body, prismicConnection, userUID }) => {
  //check if user has permission to create tasks
  const user = await userHelper({ prismicConnection, userUID });

  //if no user or permisson -> 401 unauthorized
  if (!user) return unauthorizedUserResponse();

  const task = await Task.findById(id);

  // error -> 500
  if (!task) return internalErrorResponse();

  const { description } = body;

  //check if err
  let err = {};
  if (!description || description.length === 0)
    err.description = "Description is required.";

  //if not empty return 400 and err object
  if (Object.keys(err).length !== 0) return validationErrorResponse({ err });

  // add comment to the array
  task.comments.push({ description, user });
  await task.save();

  // create notification here
  await Notification.create({
    title: `User ${user.name}, added new comment on task - ${task.title}`,
    type: notificationsTypes.addComment,
    taskID: task._id,
    user
  });

  // success
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    },
    body: JSON.stringify({ success: true, task })
  };
};
