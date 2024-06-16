import "reflect-metadata"
import { DataSource } from "typeorm"
import { Transaction } from "./entity/Transaction"
import { Service } from "./entity/Service"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "autobudget",
  synchronize: true,
  logging: false,
  entities: [Transaction, Service],
  migrations: [],
  subscribers: [],
})
