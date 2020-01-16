const express = require('express');

const server = express();
const helmet = require("helmet")
const morgan = require("morgan")

const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")

server.use(express.json())
server.use(helmet())
server.use(logger)
server.use("/api/posts", postRouter)
server.use("/api/users", userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>JESUS TAKE THE WHEEL!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`Date: [${new Date().toISOString()}] ${req.method} to ${req.url}`)
  next()
}

module.exports = server;
