const dotenv = require("dotenv");

dotenv.config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, OPENAI_API_KEY, GPT_MODEL, MAX_TOKENS } = process.env;

module.exports = { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, OPENAI_API_KEY, GPT_MODEL, MAX_TOKENS };
