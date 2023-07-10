const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const router = express.Router();

router.post("/summary", async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this ${text}`,
      max_tokens: 400,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        res.send({
          msg: data.choices[0].text,
          status: true,
        });
      }
    }
  } catch (err) {
    res.send({ msg: err.response.data.error.message, status: false });
  }
});
router.post("/text", async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `write a detailed paragraph about ${text}`,
      max_tokens: 1000,
      temperature: 0.7,
    });
    if (data) {
      if (data.choices[0].text) {
        res.send({
          msg: data.choices[0].text,
          status: true,
        });
      }
    }
  } catch (err) {
    res.send({ msg: err.response.data.error.message, status: false });
  }
});

router.post("/js", async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `write javascript code for following instruction ${text}`,
      max_tokens: 400,
      temperature: 0.7,
    });
    if (data) {
      if (data.choices[0].text) {
        res.send({
          msg: data.choices[0].text,
          status: true,
        });
      }
    }
  } catch (err) {
    res.send({ msg: err.response.data.error.message, status: false });
  }
});
router.post("/chat", async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer question similar to how Darshin would.
      Me: 'what is your name ?'
      Drashin:'Drashin is my name'
      Me:${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });
    if (data) {
      if (data.choices[0].text) {
        res.send({
          msg: data.choices[0].text,
          status: true,
        });
      }
    }
  } catch (err) {
    res.send({
      msg: data.choices[0].text,
      status: true,
    });
  }
});
router.post("/img", async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createImage({
      prompt: `generate a scifi image of ${text}`,
      n: 1,
      size: "256x256",
    });
    if (data) {
      res.send({
        msg: data.data[0].url,
        status: true,
      });
    }
  } catch (err) {
    res.send({ msg: err.message, status: false });
  }
});

module.exports = router;
