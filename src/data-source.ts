import "reflect-metadata"
import { DataSource } from "typeorm"
import { Transaction } from "./entity/Transaction"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "src/db/autobudget.sqlite",
  synchronize: true,
  logging: false,
  entities: [Transaction],
  migrations: [],
  subscribers: [],
})
