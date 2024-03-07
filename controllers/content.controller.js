const withdrawalRegex = /برداشت(\d+,\d+)/;
const depositRegex = /واریز(\d+[\.,]\d+)/;



function parseContent(req, res) {
  const content = req.body
  const balanceChange = content.split('\n')[1]
  const withdrawalMatch = balanceChange.match(withdrawalRegex);
  const depositMatch = balanceChange.match(depositRegex);
  if (withdrawalMatch) {
    let value = parseInt(withdrawalMatch[1].replace(',', ''));
    res.end(`${value}, withdraw`);
  } else if (depositMatch) {
    let value = parseFloat(depositMatch[1]);
    res.end(`${value}, deposit`);
  }
}


module.exports = {
  parseContent
}

