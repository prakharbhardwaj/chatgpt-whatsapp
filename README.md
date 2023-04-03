# ChatGPT + WhatsApp + Twilio = 🚀

![Test Cases](https://github.com/prakharbhardwaj/chatgpt-whatsapp/actions/workflows/test.yml/badge.svg)
![Prettier](https://github.com/prakharbhardwaj/chatgpt-whatsapp/actions/workflows/prettier.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<img width="904" alt="Example prompts" src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wEhSSVW6b_t93JSA8U6kbA.png">

## Introduction

This WhatsApp bot uses OpenAI's GPT and Twilio Messaging API to respond to user inputs. The tutorial walks you through the process of integrating OpenAI API and Twilio to build chatbot that can offer personalized and engaging experiences for users.

## Requirements

- Node.js (v18 or more)
- OpenAI & Twilio Accounts

## Installation

1. Clone this repository
2. Install the required packages by running `npm install`
3. Add your OpenAI API key, Twilo's Account SID, Auth Token, GPT Model and Max Tokens into the `.env` file. Example file: [.env.example](https://github.com/prakharbhardwaj/chatgpt-whatsapp/blob/main/.env.example)
4. Run the bot using `npm start`
5. Start the ngrok using `~/ngrok http 3000`

## Tutorial

For a detailed tutorial on how to build chatbot with ChatGPT and Twilio, please refer to our Medium blog post [here](https://blog.gogroup.co/building-a-whatsapp-chatbot-that-understands-integrating-chatgpt-and-twilio-f630bc8b9d84).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
