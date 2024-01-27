import express, { Express } from "express";
import * as dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log(socket.id);
  socket.on("updating-document", async (documentId: string) => {
    socket.join(documentId);

    socket.on("send-changes", (delta: any) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
