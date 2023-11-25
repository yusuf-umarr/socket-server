const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 5555;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middlewre

app.get("/", (req, res)=>{
  res.write(`Socket server started!!! on paort : ${port} `);
  res.end();
})
app.use(express.json());
var clients = {};

io.on("connection", (socket) => {
  console.log("connetetd");
  console.log(socket.id, "has joined");
  socket.on("signin", (id) => {
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });
  socket.on("message", (msg) => {
    console.log(msg);
    let targetId = msg.targetId;
    if (clients[targetId]) clients[targetId].emit("message", msg);
  });
});

/*
app.listen(PORT,  () => {
  console.log(`connected at port ${PORT}`);
});
*/

server.listen(port, () => {
  console.log("server started");
});
