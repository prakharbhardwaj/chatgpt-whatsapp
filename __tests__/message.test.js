const handler = require("../src/message"); // Replace with the correct path
const chatCompletion = require("../src/chat-completion.js");
const transcript = require("../src/transcript");
const twilio = require("twilio");

jest.mock("twilio");
jest.mock("../src/chat-completion.js");
jest.mock("../src/transcript.js");
jest.mock("../config/config.js", () => require("../__mocks__/config.mock.js"));

describe("Twilio handler", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should process text message and send response", async () => {
    const req = {
      body: {
        Body: "test message"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    chatCompletion.mockResolvedValue("processed message");

    await handler(req, res);

    expect(chatCompletion).toHaveBeenCalledWith("test message");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should process audio file and send response", async () => {
    const req = {
      body: {
        MediaContentType0: "audio/mp3",
        MediaUrl0: "test-url"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    transcript.mockResolvedValue("transcribed message");
    chatCompletion.mockResolvedValue("processed message");

    await handler(req, res);

    expect(transcript).toHaveBeenCalledWith("test-url");
    expect(chatCompletion).toHaveBeenCalledWith("transcribed message");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should ask to send message or audio file", async () => {
    const req = {
      body: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  it("should handle error", async () => {
    const req = {
      body: {
        Body: "test message"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const errorMessage = "mock error";
    chatCompletion.mockRejectedValue({ response: { data: { error: errorMessage } } });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Something went wrong",
      error: errorMessage
    });
  });
});
