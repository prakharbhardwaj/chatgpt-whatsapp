const dotenv = require("dotenv");
const config = require("../config/config.js");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const configuration = new Configuration({ apiKey: config.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

module.exports = openai;
