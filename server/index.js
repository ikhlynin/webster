require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const errorsMiddleware = require("./middleware/error-middleware");
const router = require("./router/index");
const cors = require("cors");
const PORT = process.env.PORT || 8000;

const path = require("path");

const app = express();

app.use(express.json({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use("/api", router);
app.use(errorsMiddleware);

const start = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Db connected seccessfully"));
    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
