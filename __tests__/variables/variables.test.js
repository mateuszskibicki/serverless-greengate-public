require("dotenv").config({ path: "./variables.env" });

describe("env variables", () => {
  test("required variables - local development", () => {
    expect(process.env.DB).toBeDefined();
    expect(process.env.PRISMIC_API_ENDPOINT).toBeDefined();
    expect(process.env.PRISMIC_ACCESS_TOKEN).toBeDefined();
  });
});
