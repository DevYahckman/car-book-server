require("express-async-errors");

const winston = require("winston");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const cars = require("./routes/cars");
const blogs = require("./routes/blogs");
const messages = require('./routes/messages')
const error = require("./middleware/error");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { string } = require("joi");

app.use(express.json({ limit: "50mb" }));
// photo
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.set('view engine' , 'ejs')
//
app.use(cors());
app.use(express.static("public"));
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/cars", cars);
app.use("/api/blogs", blogs);
app.use('/api/messages', messages)
app.use(error);

app.use("/", (req, res) => {
  res.send("checking");
});



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
const uri= 'mongodb+srv://adeniranyaqub565:adeniran@cluster0.rvy8scb.mongodb.net/'
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect to MongoDB"))
  .catch((err) => console.log("Could not connect", err));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
