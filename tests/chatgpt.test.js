const request = require("supertest");
const app = require("../src/app");

describe("POST /chatgpt", () => {
  // check root route
  it("should return a 200 status code and a message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Hello there");
  });

  // check chatgpt route
  it("should return a 200 status code and Twilio response XML", async () => {
    const response = await request(app)
      .post("/chatgpt")
      .send({ Body: "What's height of Effile Tower" })
      .set("Content-Type", "application/x-www-form-urlencoded");
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/text\/xml/);
  });
});
