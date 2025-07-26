const app = require("./app.js");
const dotenv = require("dotenv");
const {createServer} = require("node:http");
const {Server}  = require("socket.io");

process.env.NODE_ENV = "dev";
dotenv.config({ path: `./${process.env.NODE_ENV || "dev"}.env` });

PORT = process.env.PORT || 6969;

const mongoConnection = require("./db/db.js");
mongoConnection();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected" , socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", data.message);
    console.log(`Message sent to room ${data.room}: ${data.message}`);
    io.to(data.room).emit("bidUpdate", data.message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("<h1>IPL Fantasy League -: By Nitesh Singh</h1>");
});

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`server started running on port ${PORT}`);
});
