require("express-async-errors");

const winston = require("winston");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const cars = require("./routes/cars");
const error = require("./middleware/error");

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/cars", cars);
app.use(error);

global.logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

mongoose
  .connect("mongodb://127.0.0.1:27017/car-book", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect to MongoDB"))
  .catch((err) => console.log("Could not connect", err));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
