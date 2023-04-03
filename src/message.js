const twilio = require("twilio");
const chatCompletion = require("./chat-completion.js");
const transcript = require("./transcript.js");
const config = require("../config/config.js");

module.exports = async (req, res) => {
  try {
    let message;

    twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN); // Create a Twilio client
    const twiml = new twilio.twiml.MessagingResponse(); // Create a new Twilio Response object and send a message

    // Check if the request is a text message or audio file
    if (req.body.Body) {
      message = req.body.Body;
    } else if (req.body.MediaContentType0 && req.body.MediaContentType0.includes("audio")) {
      message = await transcript(req.body.MediaUrl0);
    } else {
      twiml.message("Please send a message or audio file");
      return res.status(200).send(twiml.toString());
    }

    // Process message with OpenAI's GPT API and return response
    const response = await chatCompletion(message);
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
