const fs = require("fs")
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


const withdrawalRegex = /برداشت(\d+,\d+)/;
const depositRegex = /واریز(\d+[\.,]\d+)/;



function parseContent(req, res) {
  const body = req.body;
  const content = body.split("||")[0];
  const bank1 = body.split("||")[1];
  const bank = (bank1.replace(/(\r\n|\n|\r)/gm, ''))
  const balanceChange = content.split('\n')[1]
  const date = content.split('\n')[3]
  console.log(date)
  const withdrawalMatch = balanceChange.match(withdrawalRegex);
  const depositMatch = balanceChange.match(depositRegex);
  if (withdrawalMatch) {
    const value = parseInt(withdrawalMatch[1].replace(',', ''));
    // put the value and withdraw in a csv file
    writeToCSV(value, "withdraw", date, bank);
    res.end(`${value}, withdraw`);
  } else if (depositMatch) {
    let value = parseFloat(depositMatch[1]);
    const date = withdrawalMatch[3];
    writeToCSV(value, "deposit", date, bank);
    res.end(`${value}, deposit`);
  }
  res.end();
}
function writeToCSV(value, transactionType, date, bank) {
  const csvWriter = createCsvWriter({
    path: 'transactions.csv',
    header: [
      { id: 'Title', title: 'Title' },
      { id: 'Value', title: 'Value' },
      { id: 'TransactionType', title: 'Transaction Type' },
      { id: 'Bank', title: 'Bank' },
      { id: 'Label', title: 'Label' },
      { id: 'Date', title: 'Date' }
    ],
    append: true,
  });

  const record = {
    Title: '',
    Value: value,
    TransactionType: transactionType,
    Bank: bank,
    Label: '',
    Date: date
  };

  // Check if the file exists
  if (!fs.existsSync('transactions.csv')) {
    // Write headers if the file doesn't exist
    csvWriter.writeRecords([{
      Title: 'Title',
      Value: 'Value',
      TransactionType: 'Transaction Type',
      Bank: 'Bank',
      Label: 'Label',
      Date: 'Date'
    }]).then(() => {
      // Append the actual record after writing headers
      csvWriter.writeRecords([record])
        .then(() => console.log('CSV file updated successfully'))
        .catch((err) => console.error('Error writing to CSV:', err));
    }).catch((err) => console.error('Error writing headers to CSV:', err));
  } else {
    // If the file exists, simply append the record
    csvWriter.writeRecords([record])
      .then(() => console.log('CSV file updated successfully'))
      .catch((err) => console.error('Error writing to CSV:', err));
  }
}




module.exports = {
  parseContent
}

