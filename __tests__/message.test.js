const twilio = require("twilio");
const chatCompletion = require("../src/chat-completion.js");
const transcript = require("../src/transcript");
const config = require("../config/config.js");
const handler = require("../src/message");

// Mock external functions
jest.mock("twilio");
jest.mock("../src/chat-completion.js");

describe("handler", () => {
  const req = {
    body: {
      Body: "Hello"
    }
  };
  const res = {
    status: jest.fn(() => res),
    set: jest.fn(() => res),
    send: jest.fn()
  };
  const twiml = {
    message: jest.fn(() => twiml),
    toString: jest.fn(() => "mocked twiml")
  };

  beforeAll(() => {
    twilio.mockReturnValue({
      twiml: {
        MessagingResponse: jest.fn(() => twiml)
      }
    });
    chatCompletion.mockResolvedValue("mocked response");
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should respond with a message", async () => {
    await handler(req, res);

    expect(twilio).toHaveBeenCalledWith(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
    expect(twilio.twiml.MessagingResponse).toHaveBeenCalled();
    expect(chatCompletion).toHaveBeenCalledWith("Hello");
    expect(res.set).toHaveBeenCalledWith("Content-Type", "text/xml");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  it("should respond with an error message", async () => {
    const error = new Error("mocked error");
    error.response = {
      data: {
        error: "mocked error"
      }
    };

    chatCompletion.mockRejectedValue(error);

    await handler(req, res);

    expect(twilio).toHaveBeenCalledWith(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
    expect(twilio.twiml.MessagingResponse).toHaveBeenCalled();
    expect(chatCompletion).toHaveBeenCalledWith("Hello");
    // expect(console.error).toHaveBeenCalledWith("mocked error");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Something went wrong",
      error: "mocked error"
    });
  });
});
