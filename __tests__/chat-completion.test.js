const openai = require("../src/openai.js");
const config = require("../config/config.js");
const chatCompletion = require("../src/chat-completion.js");

jest.mock("../src/openai.js");
jest.mock("../config/config.js", () => require("../__mocks__/config.mock.js"));

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

    // mock config
    config.GPT_MODEL = "gpt-3.5-turbo";
    config.MAX_TOKENS = 1000;

    const result = await chatCompletion(message);

    expect(openai.createChatCompletion).toHaveBeenCalledTimes(1);
    expect(openai.createChatCompletion).toHaveBeenCalledWith({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content:
            "You are ChatGPT, a large language model trained by OpenAI. You answer as concisely as possible for each responseIf you are generating a list, do not have too many items."
        },
        { role: "user", content: message }
      ],
      temperature: 0.5,
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
