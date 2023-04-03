const openai = require("../src/openai.js");
const config = require("../config/config.js");
const chatCompletion = require("../src/chat-completion.js");

jest.mock("../src/openai.js");
jest.mock("../config/config.js");

describe("chatCompletion", () => {
  const message = "Hello, AI!";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return message content from GPT API", async () => {
    const expectedContent = "Hi there!";

    openai.createChatCompletion = jest.fn().mockResolvedValue({
      data: { choices: [{ message: { content: expectedContent } }] }
    });

    const result = await chatCompletion(message);

    expect(openai.createChatCompletion).toHaveBeenCalledTimes(1);
    expect(openai.createChatCompletion).toHaveBeenCalledWith({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 1000,
      frequency_penalty: 0.7
    });
    expect(result).toEqual(expectedContent);
  });

  it("should reject with an error if chat completion fails", async () => {
    const error = new Error("Test error");

    openai.createChatCompletion.mockRejectedValue(error);

    await expect(chatCompletion(message)).rejects.toEqual(error);
  });
});
