import { Transaction } from "../entity/TransactionEntity";
import { AppDataSource } from "../data-source";
import { bankParsers } from "../utils/banks";
import { Between } from 'typeorm';



export async function create(req, res) {
  const transaction = new Transaction();
  const TransactionRepository = AppDataSource.getRepository(Transaction);
  const content = req.body.data;
  const note = req.body.user_input;
  const bank = "Bank Mellat"
  const parser = bankParsers[bank];
  if (parser) {
    const parsedTransaction = parser(content);
    transaction.amount = parsedTransaction.amount;
    transaction.deposit = parsedTransaction.type == "deposit";
    transaction.date = new Date();
    transaction.bank = bank;
    transaction.description = note
    await TransactionRepository.save(transaction);
    res.json(parsedTransaction);
  } else {
    res.json({
      message: "bank not supported yet!"
    })
  }
}

export function findAll(req, res) {
  const TransactionRepository = AppDataSource.getRepository(Transaction);
  TransactionRepository.find().then(data => {
    res.send(data);
  })
}

// find transactions where it's withing one month from now
export async function findWithinOneMonth(req, res) {
  const TransactionRepository = AppDataSource.getRepository(Transaction);
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const records = await TransactionRepository.find({
    where: {
      date: Between(oneMonthAgo, new Date())
    }
  });
  res.send(records);
}

export async function getSum(req, res) {
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
