const openai = require("../src/openai");
const { Configuration, OpenAIApi } = require("openai");

jest.mock("openai", () => ({ Configuration: jest.fn(), OpenAIApi: jest.fn() }));
jest.mock("../config/config.js", () => require("../__mocks__/config.mock.js"));

describe("OpenAI API tests", () => {
  it("creates a new Configuration object", () => {
    expect(Configuration).toHaveBeenCalledTimes(1);
    const apiKey = "my-api-key";
    const configuration = new Configuration({ apiKey });
    expect(Configuration).toHaveBeenCalledTimes(2);
    expect(Configuration).toHaveBeenCalledWith({ apiKey });
  });

  it("creates a new OpenAIApi object with the configuration", () => {
    const configuration = new Configuration({ apiKey: "my-api-key" });
    expect(OpenAIApi).toHaveBeenCalledTimes(1);
    const openai = new OpenAIApi(configuration);
    expect(OpenAIApi).toHaveBeenCalledTimes(2);
    expect(OpenAIApi).toHaveBeenCalledWith(configuration);
    expect(openai).toBeDefined();
  });

  it("exports the OpenAIApi object", () => {
    expect(openai).toBeDefined();
    expect(openai instanceof OpenAIApi).toBe(true);
  });
});
