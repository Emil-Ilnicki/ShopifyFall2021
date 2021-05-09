import express from "express";
import cors from "cors";
import { Server } from "typescript-rest";
import { router } from "./routes/routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DBURL = // <Your connection URL here>;

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(router);

Server.buildServices(app);

mongoose.Promise = global.Promise;
mongoose.connect(DBURL!, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

let PORT = 4000;

app.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
});
