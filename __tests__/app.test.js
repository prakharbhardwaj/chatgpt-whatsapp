const request = require("supertest");
const app = require("../src/app");
const message = require("../src/message");

jest.mock("../src/message");
jest.mock("../config/config.js", () => require("../__mocks__/config.mock.js"));

describe("Test POST /message endpoint", () => {
  it("should call the message middleware", async () => {
    message.mockImplementation((req, res) => {
      res.send("Mocked message response");
    });

    const response = await request(app).post("/message").send({ text: "Test message" });

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Mocked message response");
    expect(message).toHaveBeenCalledTimes(1);
  });
});

describe("Test GET / endpoint", () => {
  it('should return "Hello there"', async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Hello there");
  });
});
