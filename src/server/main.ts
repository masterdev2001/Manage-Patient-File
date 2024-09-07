import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";

import { ENV } from "./utils/constants";
import { initializeDataSource } from "./utils/datasource";
import router from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(bodyParser.json());
app.use("/api", router);
app.use(errorHandler);

initializeDataSource().then(() => {
  ViteExpress.listen(app, ENV.PORT, () =>
    console.log(`Server is listening on port ${ENV.PORT}...`)
  );
});
