import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

import { ENV } from "./constants";
import { Patient } from "../models/patient";

const options: DataSourceOptions = {
  type: "postgres",
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_DATABASE,
  entities: {
    Patient,
  },
  synchronize: true,
};

const AppDataSource = new DataSource(options);

export const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Initialized data source successfully.");
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
};

export default AppDataSource;
