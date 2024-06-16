import "reflect-metadata"
import { DataSource } from "typeorm"
import { Transaction } from "./entity/TransactionEntity"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "src/db/autobudget.sqlite",
  synchronize: true,
  logging: false,
  entities: [Transaction],
  migrations: [],
  subscribers: [],
})
