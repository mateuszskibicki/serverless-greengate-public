const Prismic = require("prismic-javascript");
const {
  unauthorizedUserResponse,
  internalErrorResponse
} = require("../utils/errorResponsesHelper");
const userHelper = require("../utils/userHelper");
const { allUsersHelper } = require("../utils/usersHelpers");

module.exports = async ({ prismicConnection, userUID }) => {
  //check if user has permission to create tasks
  const user = await userHelper({ prismicConnection, userUID });

  //if no user or permisson -> 401 unauthorized
  if (!user) return unauthorizedUserResponse();

  const data = await prismicConnection.query(
    Prismic.Predicates.at("document.type", "user")
  );

  if (!data) return internalErrorResponse();

  const users = allUsersHelper(data);

  // success
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    },
    body: JSON.stringify({ success: true, users })
  };
};
