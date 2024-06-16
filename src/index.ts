import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source"
const routes = require("./route.ts")
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Transaction } from "./entity/Transaction"
import { Service } from "./entity/Service"


AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(routes);
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log(error))
