const userHelper = require("../../src/utils/userHelper");

describe("userHelper", () => {
  test("userHelper - should be defined and a function", () => {
    expect(userHelper).toBeDefined();
    expect(typeof userHelper === "function").toBeTruthy();
  });

  test("userHelper - should return null when userUID is not provided", async () => {
    expect(
      await userHelper({ userUID: "123", prismicConnection: "" })
    ).toBeNull();
    expect(
      await userHelper({ userUID: "", prismicConnection: "123" })
    ).toBeNull();
  });
});
