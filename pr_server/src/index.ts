import express, { Express } from "express";

import BodyParser from "body-parser";
import router from "./api/api";
import cors from "cors";
import connect from "./Services/Connect";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(cors());
app.use("/", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
const db = "mongodb+srv://FRZ:ghio50541@cluster0.nb1hmv6.mongodb.net/test";
connect({ db });
