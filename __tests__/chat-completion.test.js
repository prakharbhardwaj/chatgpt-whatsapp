const openai = require("../src/openai.js");
const config = require("../config/config.js");
const chatCompletion = require("../src/chat-completion.js");

jest.mock("../src/openai.js");

describe("chatCompletion", () => {
  const message = "test message";

  it("should resolve with the chat completion", async () => {
    const response = { data: { choices: [{ message: { content: "test response" } }] } };

    openai.createChatCompletion.mockResolvedValue(response);

    const result = await chatCompletion(message);

    expect(openai.createChatCompletion).toHaveBeenCalledWith({
      model: config?.GPT_MODEL || "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: Number(config?.MAX_TOKENS) || 1000,
      frequency_penalty: 0.7
    });
    expect(result).toEqual("test response");
  });

  it("should reject with an error if chat completion fails", async () => {
    const error = new Error("Test error");

    openai.createChatCompletion.mockRejectedValue(error);

    await expect(chatCompletion(message)).rejects.toEqual(error);
  });
});
