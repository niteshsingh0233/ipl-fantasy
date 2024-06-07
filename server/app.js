const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const teamRouter = require("./routes/teamRouter.js");
app.use("/api/v1", teamRouter);
const playerRouter = require("./routes/playerRouter.js");
app.use("/api/v1", playerRouter);

module.exports = app;
