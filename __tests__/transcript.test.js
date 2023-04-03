const fetch = require("node-fetch");
const { Readable } = require("stream");
const transcribeAudio = require("../src/transcript");

// mock the fetch function to return a dummy response
jest.mock("node-fetch", () => jest.fn());
jest.mock("../src/openai.js");
jest.mock("../config/config.js", () => require("../__mocks__/config.mock.js"));

const mockFetch = (data) => {
  return Promise.resolve({
    ok: true,
    body: Readable.from(data)
  });
};

describe("transcribeAudio", () => {
  it("should transcribe audio file from Twilio CDN using OpenAI API", async () => {
    const mockAudioURL = "http://example.com/audio.mp3";
    fetch.mockImplementation(() => mockFetch(mockAudioURL));
    const result = await transcribeAudio(mockAudioURL);
    expect(result).toBeDefined();
    expect(fetch).toHaveBeenCalledWith(mockAudioURL);
  });

  it("should handle errors", async () => {
    const error = new Error("mock error");
    fetch.mockRejectedValue(error);
    const mockAudioURL = "http://example.com/audio.mp3";
    const result = await transcribeAudio(mockAudioURL);
    expect(result).toEqual(error);
  });
});
