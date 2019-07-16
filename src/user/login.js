const userLoginPasswordHelper = require("../utils/userLoginPasswordHelper");
const Notification = require("../models/Notification");
const notificationsTypes = require("../utils/notificationsTypes");
const {
  unauthorizedUserResponse,
  validationErrorResponse
} = require("../utils/errorResponsesHelper");

module.exports = async ({ body, prismicConnection }) => {
  const { email, password } = body;

  //check if err
  let err = {};
  if (!email || email.length === 0) err.email = "Email is required.";
  if (!password || password.length === 0)
    err.password = "Password is required.";

  //if not empty return 400 and err object
  if (Object.keys(err).length !== 0) return validationErrorResponse({ err });

  const user = await userLoginPasswordHelper({
    prismicConnection,
    email,
    password
  });

  if (!user) return unauthorizedUserResponse();

  // create notification here
  await Notification.create({
    title: `User ${user.name}, logged in`,
    type: notificationsTypes.loggedIn,
    user
  });

  // success
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    },
    body: JSON.stringify({ success: true, user })
  };
};
