const csv = require("csv");
const fs = require("fs")

const withdrawalRegex = /برداشت(\d+,\d+)/;
const depositRegex = /واریز(\d+[\.,]\d+)/;



function parseContent(req, res) {
  const content = req.body
  const balanceChange = content.split('\n')[1]
  const date = content.split('\n')[3]
  console.log(date)
  const withdrawalMatch = balanceChange.match(withdrawalRegex);
  const depositMatch = balanceChange.match(depositRegex);
  if (withdrawalMatch) {
    const value = parseInt(withdrawalMatch[1].replace(',', ''));
    // put the value and withdraw in a csv file
    writeToCSV(value, "withdraw", date);
    res.end(`${value}, withdraw`);
  } else if (depositMatch) {
    let value = parseFloat(depositMatch[1]);
    const date = withdrawalMatch[3];
    writeToCSV(value, "deposit", date);
    res.end(`${value}, deposit`);
  }
  res.end();
}
function writeToCSV(value, transactionType, date) {
  const headers = ["Value", "Transaction Type", "Date"];
  const filename = "transactions.csv";

  // Check if file exists
  if (!fs.existsSync(filename)) {
    // Write headers
    fs.writeFileSync(filename, headers.join(",") + "\n");
  }

  // Append data to CSV file
  fs.appendFileSync(filename, `${value},${transactionType},${date}\n`);
}


module.exports = {
  parseContent
}

