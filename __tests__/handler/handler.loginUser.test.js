const { loginUser } = require("../../handler");

describe("handler - loginUser - /login - POST", () => {
  let context = {};
  let callback = null;

  test("should be defined and a function", async () => {
    expect(loginUser).toBeDefined();
    expect(typeof loginUser == "function").toBeTruthy();
  });

  test("should return 401 unauthorized when dummy data", async () => {
    //event -> body JSON.stringify, context, callback
    const event = {
      body: JSON.stringify({
        email: "dummyemail@email.com",
        password: "123456"
      })
    };
    const response = await loginUser(event, context, callback);
    const body = JSON.parse(response.body);
    expect(response.statusCode).toBe(401);
    expect(body.success).toBeFalsy();
  });

  test("should return 500 unauthorized when wrong data provided", async () => {
    //event -> body JSON.stringify, context, callback
    const event = {};
    const response = await loginUser(event, context, callback);
    const body = JSON.parse(response.body);
    expect(response.statusCode).toBe(500);
    expect(body.success).toBeFalsy();
  });
});
