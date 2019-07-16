const Notification = require("../models/Notification");
const userHelper = require("../utils/userHelper");
const {
  unauthorizedUserResponse,
  notFoundResponse
} = require("../utils/errorResponsesHelper");

module.exports = async ({ uid, prismicConnection, userUID, page }) => {
  //check if user has permission to create tasks
  const user = await userHelper({ prismicConnection, userUID });

  //if no user or permisson -> 401 unauthorized
  if (!user) return unauthorizedUserResponse();

  const pgaeSize = 50;

  const notifications = await Notification.find({ "user.uid": uid })
    .populate("taskID", ["title", "_id", "timeRange", "day", "apartment"])
    .limit(pgaeSize)
    .skip(pgaeSize * (page - 1))
    .sort({ createdAt: "desc" });

  //count all of them
  const notificationsSize = await Notification.count({ "user.uid": uid });

  // error -> 404
  if (!notifications) return notFoundResponse();

  // success
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    },
    body: JSON.stringify({
      success: true,
      notifications,
      notificationsSize,
      page,
      pgaeSize
    })
  };
};
