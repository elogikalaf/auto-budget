import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source"
import route from "./route"
import "reflect-metadata"

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(route);
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log(error))
