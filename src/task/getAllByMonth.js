const Task = require("../models/Task");
const userHelper = require("../utils/userHelper");
const {
  unauthorizedUserResponse,
  notFoundResponse
} = require("../utils/errorResponsesHelper");

module.exports = async ({ prismicConnection, userUID, month, minified }) => {
  //check if user has permission to create tasks
  const user = await userHelper({ prismicConnection, userUID });

  //if no user or permisson -> 401 unauthorized
  if (!user) return unauthorizedUserResponse();

  let tasks;

  if (!minified) {
    tasks = await Task.find({
      day: {
        $gte: new Date(`2019-${month}-01`),
        $lte: new Date(`2019-${month}-31`)
      }
    });
  } else {
    tasks = await Task.find(
      {
        day: {
          $gte: new Date(`2019-${month}-01`),
          $lte: new Date(`2019-${month}-31`)
        }
      },
      "title day timeRange status icon color apartment createdAt user.name"
    );
  }

  // error -> 404
  if (!tasks) return notFoundResponse();

  // success
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    },
    body: JSON.stringify({ success: true, tasks, stage: process.env.NODE_ENV })
  };
};
