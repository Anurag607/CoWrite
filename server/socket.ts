import express, { Express } from "express";
import * as dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const LOCAL = `http://${HOST}:${PORT}`;
const RENDER = process.env.RENDER;

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  socket.on(
    "updating-document",
    async ({ documentId, user }: { documentId: string; user: string }) => {
      socket.join(documentId);
      console.log(
        `Socket connected: ${socket.id} in rooms:`,
        socket.rooms.keys()
      );

      const userData = {
        id: socket.id,
        name: user,
        currentDocument: documentId,
      };

      socket.broadcast.emit("update-clients", userData);

      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
        socket.broadcast.emit("remove-clients", userData);
      });

      socket.on("send-changes", (delta: any) => {
        // console.log(`Changes from ${socket.id} : `, delta);
        socket.broadcast.emit("receive-changes", delta);
      });
    }
  );
});

server.listen(PORT, () => {
  console.log(`Server running on ${RENDER}`);
});
