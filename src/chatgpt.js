const { Configuration, OpenAIApi } = require("openai");
const twilio = require("twilio");
require("dotenv").config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, OPENAI_API_KEY } = process.env;

// Create a Twilio client and OpenAI client
twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  try {
    // Create a new Twilio Response object and send a message
    const twiml = new twilio.twiml.MessagingResponse();
    const message = req.body.Body;

    // Process message with OpenAI's GPT-3 API and return response
    const response = await processMessageWithChatGPT(message);
    twiml.message(response);

    // Send the response back to Twilio
    res.set("Content-Type", "text/xml");
    res.status(200).send(twiml.toString());
  } catch (error) {
    console.error(error.response.data.error);
    res.status(500).send({
      message: "Something went wrong",
      error: error.response.data.error
    });
  }
};

/* Returns a response from OpenAI's GPT-3.5 API
 * https://platform.openai.com/docs/api-reference/chat/create?lang=node.js */
const processMessageWithChatGPT = async (message) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
    temperature: 0.7, //A number between 0 and 2 that determines how many creative risks the engine takes when generating text.
    max_tokens: 4096, // Maximum completion length. max: 4096-prompt
    frequency_penalty: 0.7 // # between -2.0 and 2.0. The higher this value, the bigger the effort the model will make in not repeating itself.
  });

  return response.data.choices[0].message.content;
};
