const Task = require("../models/Task");
const Notification = require("../models/Notification");
const notificationsTypes = require("../utils/notificationsTypes");
const userHelper = require("../utils/userHelper");
const {
  unauthorizedUserResponse,
  internalErrorResponse
} = require("../utils/errorResponsesHelper");

module.exports = async ({ id, prismicConnection, userUID }) => {
  //check if user has permission to update tasks
  const user = await userHelper({ prismicConnection, userUID });

  //if no user or permisson -> 401 unauthorized
  if (!user || !user.is_admin || !user.is_super_admin)
    return unauthorizedUserResponse();

  const task = await Task.findByIdAndRemove({ _id: id });

  // error -> 500
  if (!task) return internalErrorResponse();

  // create notification here
  await Notification.create({
    title: `User ${user.name}, removed task - ${task.title}`,
    type: notificationsTypes.removeTask,
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
