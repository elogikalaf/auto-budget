import { Transaction } from "../entity/Transaction";
import { AppDataSource } from "../data-source";
import { bankParsers } from "../utils/banks";


async function create(req, res) {
  const transaction = new Transaction();
  const TransactionRepository = AppDataSource.getRepository(Transaction);
  const body = req.body;
  console.log(body.content)
  console.log(body.bank)
  const content = body.content
  const bank = body.bank
  const parser = bankParsers[bank];
  if (parser) {
    const parsedTransaction = parser(content);
    res.json(parsedTransaction);
  } else {
    res.json({
      message: "bank not supported yet!"
    })
  }
}

function findAll(req, res) {
  const TransactionRepository = AppDataSource.getRepository(Transaction);
  TransactionRepository.find().then(data => {
    res.send(data);
  })
}

async function getSum(req, res) {
  const TransactionRepository = AppDataSource.getRepository(Transaction);
  const transactions = await TransactionRepository.find();
  const sum = transactions.reduce((acc, t) => {
    if (t.deposit == true) {
      return acc + t.amount
    } else {
      return acc - t.amount
    }
  }, 0)
  res.send({
    sum: sum
  });
}

module.exports = {
  findAll,
  create,
  getSum,
}

