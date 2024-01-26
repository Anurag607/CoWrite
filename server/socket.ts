import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import { getEntry, updateEntry } from "./queries";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const database = process.env.MONGODB_DB || "";

const app: Express = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  socket.on("get-document", async (documentId: string) => {
    const document = await getEntry(database, "documents", documentId);
    socket.join(documentId);
    if (document) socket.emit("load-document", document.data);

    socket.on("send-changes", (delta: any) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data: any) => {
      await updateEntry(database, "documents", documentId, { data });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
