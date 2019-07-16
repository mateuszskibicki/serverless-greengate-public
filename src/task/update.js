const Task = require("../models/Task");
const Notification = require("../models/Notification");
const notificationsTypes = require("../utils/notificationsTypes");
const userHelper = require("../utils/userHelper");
const {
  unauthorizedUserResponse,
  internalErrorResponse,
  validationErrorResponse
} = require("../utils/errorResponsesHelper");

module.exports = async ({ body, id, prismicConnection, userUID }) => {
  //check if user has permission to update tasks
  const user = await userHelper({ prismicConnection, userUID });

  //if no user or permisson -> 401 unauthorized
  if (!user || !user.is_admin) return unauthorizedUserResponse();

  const {
    title,
    description,
    timeRange,
    day,
    apartment,
    color,
    status,
    icon
  } = body;

  //check if err
  let err = {};
  if (!title || title.length === 0) err.title = "Title is required.";
  if (!description || description.length === 0)
    err.description = "Description is required.";

  //if not empty return 400 and err object
  if (Object.keys(err).length !== 0) return validationErrorResponse({ err });

  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      timeRange,
      day: new Date(day).toISOString(),
      apartment,
      color,
      status,
      icon
    },
    { new: true }
  );

  // error -> 500
  if (!task) return internalErrorResponse();

  // create notification here
  await Notification.create({
    title: `User ${user.name}, updated task - ${task.title}`,
    type: notificationsTypes.updateTask,
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
