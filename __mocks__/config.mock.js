const mockConfigVariables = {
  TWILIO_ACCOUNT_SID: "mock_account_sid",
  TWILIO_AUTH_TOKEN: "mock_auth_token",
  OPENAI_API_KEY: "mock_api_key",
  GPT_MODEL: "mock_model",
  MAX_TOKENS: "mock_max_tokens",
  REGION: "mock_region",
  APP_PORT: "mock_app_port"
};

jest.mock("dotenv", () => ({
  config: () => ({ parsed: mockConfigVariables }),
  parse: () => mockConfigVariables
}));

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, OPENAI_API_KEY, GPT_MODEL, MAX_TOKENS, REGION, APP_PORT } = process.env;

module.exports = { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, OPENAI_API_KEY, GPT_MODEL, MAX_TOKENS, REGION, APP_PORT };
