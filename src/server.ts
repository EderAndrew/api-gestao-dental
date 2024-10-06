import express from "express";
import cors from "cors";
import helmet from "helmet";
import { mainRouter } from "./routes/main";

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/api", mainRouter);

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
