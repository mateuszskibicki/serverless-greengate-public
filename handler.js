"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./variables.env" });
}
//db connection
const connectToDatabase = require("./src/db-connection");
const connectToPrismic = require("./src/prismic-connection");

//error catch response
const { errorCatchResponse } = require("./src/utils/errorResponsesHelper");

//login user
const loginUser = require("./src/user/login");
const getAllUsers = require("./src/user/getAllUsers");
const getSingleUser = require("./src/user/getSingleUser");

//tasks
const createTask = require("./src/task/create");
const getAllTasks = require("./src/task/getAll");
const getAllTasksByMonth = require("./src/task/getAllByMonth");
const getAllTasksByDay = require("./src/task/getAllByDay");
const getOneTaskByID = require("./src/task/getOneByID");
const updateTask = require("./src/task/update");
const updateTaskStatus = require("./src/task/updateStatus");
const removeTask = require("./src/task/remove");
const addCommentToTask = require("./src/task/addComment");

//notifications
const createNotification = require("./src/notification/create");
const getAllNotifications = require("./src/notification/getAll");
const getAllNotificationsByTaskID = require("./src/notification/getAllByTaskID");
const getAllNotificationsByUserUID = require("./src/notification/getAllByUserUID");

//google
const createRaport = require("./src/google/createRaport");

// #####################
//// ###### USER LOGIN
// #####################
module.exports.loginUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const body = JSON.parse(event.body);
    return await loginUser({ body, prismicConnection });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### GET ALL USERS
// #####################
module.exports.getAllUsers = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    return await getAllUsers({ prismicConnection, userUID });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### GET SINGLE USER BY UID
// #####################
module.exports.getSingleUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const uid = event.pathParameters.uid;
    return await getSingleUser({ prismicConnection, userUID, uid });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### CREATE TASK
// #####################
module.exports.createTask = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const body = JSON.parse(event.body);
    return await createTask({ body, prismicConnection, userUID });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### GET ALL TASKS (OPTIONAL MINIFIED)
// #####################
module.exports.getAllTasks = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const minified =
      event.queryStringParameters &&
      event.queryStringParameters.mini &&
      event.queryStringParameters.mini === "true"
        ? true
        : false;
    return await getAllTasks({ prismicConnection, userUID, minified });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### GET ALL TASKS BY MONTH (OPTIONAL MINIFIED)
// #####################
module.exports.getAllTasksByMonth = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const minified =
      event.queryStringParameters &&
      event.queryStringParameters.mini &&
      event.queryStringParameters.mini === "true"
        ? true
        : false;
    const month = event.pathParameters.month;
    return await getAllTasksByMonth({
      prismicConnection,
      userUID,
      month,
      minified
    });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### GET ALL TASKS BY DAY (OPTIONAL MINIFIED)
// #####################
module.exports.getAllTasksByDay = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const minified =
      event.queryStringParameters &&
      event.queryStringParameters.mini &&
      event.queryStringParameters.mini === "true"
        ? true
        : false;
    const month = event.pathParameters.month;
    const dayStart = event.pathParameters.dayStart;
    const dayEnd = event.pathParameters.dayEnd;
    return await getAllTasksByDay({
      prismicConnection,
      userUID,
      month,
      dayStart,
      dayEnd,
      minified
    });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### GET TAK BY ID
// #####################
module.exports.getTaskByID = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const id = event.pathParameters.id;
    return await getOneTaskByID({ id, prismicConnection, userUID });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### UPDATE TASK
// #####################
module.exports.updateTask = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;
    return await updateTask({ id, body, prismicConnection, userUID });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### UPDATE TASK STATUS
// #####################
module.exports.updateTaskStatus = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;
    return await updateTaskStatus({
      id,
      status: body.status,
      prismicConnection,
      userUID
    });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### REMOVE TASK
// #####################
module.exports.removeTask = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const id = event.pathParameters.id;
    return await removeTask({ id, prismicConnection, userUID });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### ADD COMMENT TO TASK
// #####################
module.exports.addCommentToTask = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;
    return await addCommentToTask({ id, body, prismicConnection, userUID });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### CREATE NOTIFICATION
// #####################
module.exports.createNotification = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;
    return await createNotification({ body, id, prismicConnection, userUID });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### GET ALL NOTIFICATIONS
// #####################
module.exports.getAllNotifications = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const page =
      event.queryStringParameters && event.queryStringParameters.page
        ? Number(event.queryStringParameters.page)
        : 1;
    return await getAllNotifications({ prismicConnection, userUID, page });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### GET ALL NOTIFICATIONS BY TASK ID
// #####################
module.exports.getAllNotificationsByTaskID = async (
  event,
  context,
  callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const id = event.pathParameters.id;
    const page =
      event.queryStringParameters && event.queryStringParameters.page
        ? Number(event.queryStringParameters.page)
        : 1;
    return await getAllNotificationsByTaskID({
      id,
      prismicConnection,
      userUID,
      page
    });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// #####################
//// ###### GET ALL NOTIFICATIONS BY USER UID
// #####################
module.exports.getAllNotificationsByUserUID = async (
  event,
  context,
  callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const prismicConnection = await connectToPrismic();
    const userUID = event.headers["Authorization"];
    const uid = event.pathParameters.uid;
    const page =
      event.queryStringParameters && event.queryStringParameters.page
        ? Number(event.queryStringParameters.page)
        : 1;
    return await getAllNotificationsByUserUID({
      uid,
      prismicConnection,
      userUID,
      page
    });
  } catch (err) {
    return errorCatchResponse({ err });
  }
};

// // #####################
// //// ###### CREATE RAPORT IN GOOGLE
// // #####################
// module.exports.createRaport = async (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;
//   try {
//     await connectToDatabase();
//     const prismicConnection = await connectToPrismic();
//     const userUID = event.headers["Authorization"];
//     const year = event.pathParameters.year;
//     const month = event.pathParameters.month;
//     return await createRaport({
//       prismicConnection,
//       userUID,
//       year,
//       month
//     });
//   } catch (err) {
//     return errorCatchResponse({ err });
//   }
// };
