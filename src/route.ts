import { Router } from "express";
const { parseContent, showData } = require("./controller/TransactionController")
const route = Router()



route.post("/transactions", parseContent);
route.get("/transactions", showData);

module.exports = route
