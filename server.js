const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const path = require("path");

const mongoose = require("mongoose");

const mongoAtlasUri = "mongodb+srv://nikhil:kanbanboard@cluster0.hxart.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0y";

mongoose
  .connect(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const initialize = require("./config/passportConfig");
initialize(passport);

const homeRouter = require("./routes/api/homeRouter");
const boardRouter = require("./routes/api/boardRouter");
const listRouter = require("./routes/api/listRouter");
const cardRouter = require("./routes/api/cardRouter");

const app = express();

const port = process.env.PORT || 5000;

const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: "abc123",
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
  store: MongoStore.create({
    mongoUrl: mongoAtlasUri,
    dbName: "sessions",
  }),
};

app.use(helmet());

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", boardRouter);
app.use("/api", listRouter);
app.use("/api", cardRouter);

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);

  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});