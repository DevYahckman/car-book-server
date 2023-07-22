const express = require("express");
const router = express.Router();

const { Message, validate } = require("../model/message");
const _ = require("lodash");

router.get("/", async (req, res) => {
  const messages = await Message.find();
  res.send(messages);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const message = new Message(
    _.pick(req.body, ["name", "message", "date", "email"])
  );

  await message.save();
  res.send(message);
});

module.exports = router;
