import { Router } from "express";
import { create, findAll, getSum } from "./controller/TransactionController"
const route = Router()



route.post("/transactions", create);
route.get("/transactions", findAll);
route.get("/transactions/sum", getSum);

export default route;

