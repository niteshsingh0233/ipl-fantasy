const app = require("./app.js");
const dotenv = require("dotenv");

process.env.NODE_ENV = "dev";
dotenv.config({ path: `./${process.env.NODE_ENV || "dev"}.env` });

PORT = process.env.PORT || 6969;

const mongoConnection = require("./db/db.js");
mongoConnection();

app.get("/", (req, res) => {
  res.send("<h1>IPL Fantasy League -: By Nitesh Singh</h1>");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server started running on port ${PORT}`);
});
