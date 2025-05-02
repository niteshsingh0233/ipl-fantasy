const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "https://fantasy-app-ui.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());

const userRouter = require("./routes/userRoute.js");
app.use("/api/v1/user", userRouter);

const playerRouter = require("./routes/playerRoute.js");
app.use("/api/v1/player", playerRouter);

const teamRouter = require("./routes/teamRoute.js");
app.use("/api/v1/team", teamRouter);

const venueRouter = require("./routes/venueRoute.js");
app.use("/api/v1/venue", venueRouter);

const ownerRouter = require("./routes/ownerRoute.js");
app.use("/api/v1/owner", ownerRouter);

const pointRouter = require("./routes/pointRoute.js");
app.use("/api/v1/point", pointRouter);

const matchRouter = require("./routes/matchRoute.js");
app.use("/api/v1/match", matchRouter);

const seriesRouter = require("./routes/seriesRoute.js");
app.use("/api/v1/series", seriesRouter);

const gameRouter = require("./routes/gameRoute.js");
app.use("/api/v1/game", gameRouter);

const cdsRouter = require("./routes/cdsRoute.js");
app.use("/api/v1/cds", cdsRouter);

const logsRoute = require("./routes/logsRoute.js");
app.use("/api/v1/logs", logsRoute);

const contestRoute = require("./routes/contestRoute.js")
app.use("/api/v1/contest", contestRoute);

const contestOwnerRoute = require("./routes/contestOwnerRoute.js")
app.use("/api/v1/contestOwner", contestOwnerRoute);

module.exports = app;
