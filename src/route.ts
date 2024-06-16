import { Router } from "express";
const { create, findAll, getSum } = require("./controller/TransactionController")
const route = Router()



route.post("/transactions", create);
route.get("/transactions", findAll);
route.get("/transactions/sum", getSum);


module.exports = route
