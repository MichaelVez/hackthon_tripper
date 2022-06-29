const express = require("express");
const cors = require("cors");
const usersRouter = require("./routers/users.router");
const countryRouter = require("./routers/countries.router");
const app = express();
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors());


app.use("/users", usersRouter);
app.use(countryRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});
module.exports = app;
