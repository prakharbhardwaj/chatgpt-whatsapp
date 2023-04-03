const openai = require("./openai.js");
const { Readable } = require("stream");
const { spawn } = require("child_process");
const fetch = require("node-fetch");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

/**
 * Transcribes audio data from a Readable Node stream using OpenAI.
 * Uses ffmpeg to convert the input audio data from Ogg to MP3 format.
 * @param {Readable} input - The input audio stream to transcribe (in Ogg format).
 * @returns {Promise<string>} A Promise that resolves with the transcribed text.
 */
const transcribeAudio = async (input) => {
  // use ffmpeg to convert the input audio from Ogg to MP3 format
  const proc = spawn(ffmpegPath, ["-f", "ogg", "-i", "-", "-f", "mp3", "-"]);
  input.pipe(proc.stdin);
  // set the output path to "upload.mp3" for debugging purposes
  proc.stdout.path = "upload.mp3";
  // transcribe the MP3 audio using OpenAI API
  const result = await openai.createTranscription(proc.stdout, "whisper-1");
  return result?.data?.text || "";
};

/**
 * Downloads an audio file from a URL and transcribes its contents using OpenAI.
 * @returns {Promise<void>} A Promise that resolves when the transcription is complete.
 */
module.exports = async (twilioAudioURL) => {
  try {
    // fetch the audio file from Twilio CDN
    const response = await fetch(twilioAudioURL);
    // convert the Response object into a Node stream
    const nodeStream = Readable.from(response.body);
    // transcribe the audio from the stream using OpenAI
    const transcription = await transcribeAudio(nodeStream);
    return transcription;
  } catch (error) {
    console.error(error);
    return error;
  }
};
