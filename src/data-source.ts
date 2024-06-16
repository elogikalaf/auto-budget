import "reflect-metadata"
import { DataSource } from "typeorm"
import { Transaction } from "./entity/Transaction"
import { Service } from "./entity/Service"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "src/db/autobudget.sqlite",
  synchronize: true,
  logging: false,
  entities: [Transaction, Service],
  migrations: [],
  subscribers: [],
})
