import { Transaction } from "../entity/Transaction";
import { AppDataSource } from "../data-source";

const withdrawalRegex = /برداشت(.+)/;
const depositRegex = /واریز(.+)/;

async function parseContent(req, res) {
  const transaction = new Transaction();
  const TransactionRepository = AppDataSource.getRepository(Transaction);
  const content = req.body;
  console.log(content)
  const balanceChange = content.split('\n')[1]
  const withdrawalMatch = balanceChange.match(withdrawalRegex);
  const depositMatch = balanceChange.match(depositRegex);
  if (withdrawalMatch) {
    const amount = parseInt(withdrawalMatch[1].replace(/,/g, ""))
    console.log(`${amount}, withdraw`)
    transaction.amount = amount
    transaction.deposit = false
    transaction.description = "test"
    await TransactionRepository.save(transaction);
    res.send(`${amount}, withdraw`);
  } else if (depositMatch) {
    const amount = parseInt(depositMatch[1].replace(/,/g, ""))
    console.log(`${amount}, deposit`)
    transaction.amount = amount
    transaction.deposit = true
    transaction.description = "test"
    await TransactionRepository.save(transaction);
    res.send(`${amount}, deposit`);
  }
  else {
    console.log(content)
    res.send("failed")
  }
  res.end();
}

function showData(req, res) {
  const TransactionRepository = AppDataSource.getRepository(Transaction);
  TransactionRepository.find().then(data => {
    res.send(data);
  })
}

module.exports = {
  parseContent,
  showData
}

