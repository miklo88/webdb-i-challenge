const express = require("express");

// SERVER
const server = express();

// MIDDLEWARE CLOBAL
server.use(express.json());

// ROUTER IMPORTS FOR ROUTES
// const accountRouter = require("../router/account-router.js");

// ROUTERS BEING UTILIZED FROM IMPORTS.
// server.use("/data/router/account-api", accountRouter);

// SERVER API
server.get("/", (req, res) => {
  res.status(200).json({
    url: "/home",
    message: "Welcome to Carl's Server",
    messageOfTheDay: process.env.POTD,
    aboutMe: process.env.AM,
    operation: "GET"
  });
});

// SERVER API ERR HANDLER
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Oopsies"
  });
});

module.exports = server;
