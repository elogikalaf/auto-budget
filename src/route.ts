import { Router } from "express";
import { create, findAll, getSum, findWithinOneMonth } from "./controller/TransactionController"
const route = Router()



route.post("/transactions", create);
route.get("/transactions", findAll);
route.get("/transactions/sum", getSum);
route.get("/transactions/month", findWithinOneMonth);

export default route;

