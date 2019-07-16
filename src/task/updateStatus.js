const Task = require("../models/Task");
const Notification = require("../models/Notification");
const notificationsTypes = require("../utils/notificationsTypes");
const userHelper = require("../utils/userHelper");
const {
  unauthorizedUserResponse,
  internalErrorResponse,
  validationErrorResponse
} = require("../utils/errorResponsesHelper");

module.exports = async ({ status, id, prismicConnection, userUID }) => {
  //check if user has permission to create tasks
  const user = await userHelper({ prismicConnection, userUID });

  //if no user or permisson -> 401 unauthorized
  if (!user) return unauthorizedUserResponse();

  //check if err
  let err = {};
  if (!status || status.length === 0) err.status = "Status is required.";

  //if not empty return 400 and err object
  if (Object.keys(err).length !== 0) return validationErrorResponse({ err });

  const task = await Task.findOneAndUpdate(
    { _id: id },
    { status },
    { new: true }
  );

  // error -> 500
  if (!task) return internalErrorResponse();

  // create notification here
  await Notification.create({
    title: `User ${user.name}, changed task status - ${
      task.title
    } - to: '${status}'`,
    type: notificationsTypes.changeTaskStatus,
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
