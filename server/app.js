const express = require("express");
const usersRouter = require("./routers/users.router");
// import { someRouter } from "./routes/router.js";
const app = express();
// import path from "path";
const path = require("path");
// import { dirname } from "path";
// import { fileURLToPath } from "url";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../client/build")));


app.use('/users', usersRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});
module.exports = app;
// export { app };
