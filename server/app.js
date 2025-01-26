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
const uploadRouter = require("./routes/uploadRouter.js");
app.use("/api/v1", uploadRouter);
const ownerRouter = require("./routes/ownerRouter.js");
app.use("/api/v1", ownerRouter);
const matchScoreRouter = require("./routes/matchScoreRouter.js");
app.use("/api/v1", matchScoreRouter);
const pointRouter = require("./routes/pointRouter.js");
app.use("/api/v1", pointRouter);
const seriesRouter = require("./routes/seriesRouter.js");
app.use("/api/v1", seriesRouter);
const numberGeneratorRouter = require("./routes/numberGeneratorRouter.js");
app.use("/api/v1", numberGeneratorRouter);

module.exports = app;
