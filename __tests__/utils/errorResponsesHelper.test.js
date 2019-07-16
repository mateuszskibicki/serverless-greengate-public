const {
  errorCatchResponse,
  unauthorizedUserResponse,
  notFoundResponse,
  internalErrorResponse,
  validationErrorResponse
} = require("../../src/utils/errorResponsesHelper");

describe("errorResponsesHelper", () => {
  describe("errorCatchResponse", () => {
    test("errorCatchResponse - should be defined and a function", () => {
      expect(errorCatchResponse).toBeDefined();
      expect(typeof errorCatchResponse === "function").toBeTruthy();
    });

    test("errorCatchResponse - should return 500 and msg/err", () => {
      const err = { message: "Broken dummy error." };
      const response = errorCatchResponse({ err });
      const responseBody = JSON.parse(response.body);
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(500);
      expect(responseBody.msg).toBeDefined();
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.err).toBe(err.message);
    });
  });

  describe("unauthorizedUserResponse", () => {
    test("unauthorizedUserResponse - should be defined and a function", () => {
      expect(unauthorizedUserResponse).toBeDefined();
      expect(typeof unauthorizedUserResponse === "function").toBeTruthy();
    });

    test("unauthorizedUserResponse - should return 401 and msg", () => {
      const response = unauthorizedUserResponse();
      const responseBody = JSON.parse(response.body);
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(401);
      expect(responseBody.msg).toBeDefined();
      expect(responseBody.success).toBeFalsy();
    });
  });

  describe("notFoundResponse", () => {
    test("notFoundResponse - should be defined and a function", () => {
      expect(notFoundResponse).toBeDefined();
      expect(typeof notFoundResponse === "function").toBeTruthy();
    });

    test("notFoundResponse - should return 404 and msg", () => {
      const response = notFoundResponse();
      const responseBody = JSON.parse(response.body);
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(404);
      expect(responseBody.msg).toBeDefined();
      expect(responseBody.success).toBeFalsy();
    });
  });

  describe("internalErrorResponse", () => {
    test("internalErrorResponse - should be defined and a function", () => {
      expect(internalErrorResponse).toBeDefined();
      expect(typeof internalErrorResponse === "function").toBeTruthy();
    });

    test("internalErrorResponse - should return 401 and msg", () => {
      const response = internalErrorResponse();
      const responseBody = JSON.parse(response.body);
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(500);
      expect(responseBody.msg).toBeDefined();
      expect(responseBody.success).toBeFalsy();
    });
  });

  describe("validationErrorResponse", () => {
    test("validationErrorResponse - should be defined and a function", () => {
      expect(validationErrorResponse).toBeDefined();
      expect(typeof validationErrorResponse === "function").toBeTruthy();
    });

    test("validationErrorResponse - should return 400 and msg/err", () => {
      const err = { title: "Title is required." };
      const response = validationErrorResponse({ err });
      const responseBody = JSON.parse(response.body);
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(400);
      expect(responseBody.msg).toBeDefined();
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.err.title).toBe(err.title);
    });
  });
});
