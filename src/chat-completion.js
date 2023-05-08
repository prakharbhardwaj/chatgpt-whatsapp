const openai = require("./openai.js");
const config = require("../config/config.js");

/* Returns a response from OpenAI's GPT API
 * https://platform.openai.com/docs/api-reference/chat/create?lang=node.js */
module.exports = async (message) => {
  const response = await openai.createChatCompletion({
    model: config?.GPT_MODEL || "gpt-3.5-turbo",
    messages: [
      {
        role: "assistant",
        content:
          "You are ChatGPT, a large language model trained by OpenAI. You answer as concisely as possible for each responseIf you are generating a list, do not have too many items."
      },
      { role: "user", content: message }
    ],
    temperature: 0.5, //A number between 0 and 2 that determines how many creative risks the engine takes when generating text.
    max_tokens: Number(config?.MAX_TOKENS) || 1000, // Maximum completion length. max: 4096-prompt
    frequency_penalty: 0.7 // between -2.0 and 2.0. The higher this value, the bigger the effort the model will make in not repeating itself.
  });

  return response.data.choices[0].message.content;
};
