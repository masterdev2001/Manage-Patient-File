import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";

import { ENV } from "./utils/constants";
import router from "./routes";

const app = express();

app.use(bodyParser.json());
app.use("/api", router);

ViteExpress.listen(app, ENV.PORT, () =>
  console.log(`Server is listening on port ${ENV.PORT}...`)
);
