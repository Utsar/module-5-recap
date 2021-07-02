import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import { join } from "path";
import filesRouter from "./services/files/index.js";
import usersRouter from "./services/users/index.js";
import { getCurrentFolderPath } from "./lib/fs-tools.js";

const port = process.env.PORT || 3001;

const server = express();

const publicFolderPath = join(
  getCurrentFolderPath(import.meta.url),
  "../public"
);

// ********** MIDDLEWARES ********
server.use(express.static(publicFolderPath));
server.use(cors());
server.use(express.json());

// ********** ENDPOINTS ********
server.use("/users", usersRouter);
server.use("/files", filesRouter);

// ********** ERROR MIDDLEWARES ********

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
