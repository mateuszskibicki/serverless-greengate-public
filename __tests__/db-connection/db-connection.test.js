const connectToDatabase = require("../../src/db-connection");
require("dotenv").config({ path: "./variables.env" });

describe("db-connection", () => {
  test("should return true and connection", async () => {
    const connection = await connectToDatabase();
    expect(connectToDatabase).toBeDefined();
    expect(connection).toBeDefined();
    expect(connection.is_connected).toBeTruthy();
  });
});
