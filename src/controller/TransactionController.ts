const withdrawalRegex = /برداشت(.+)/;
const depositRegex = /واریز(.+)/;

function parseContent(req, res) {
  const content = req.body;
  const balanceChange = content.split('\n')[1]
  const date = content.split('\n')[3]
  const withdrawalMatch = balanceChange.match(withdrawalRegex);
  const depositMatch = balanceChange.match(depositRegex);
  if (withdrawalMatch) {
    const value = parseInt(withdrawalMatch[1].replace(/,/g, ""))
    console.log(`${value}, withdraw`)
    res.send(`${value}, withdraw`);
  } else if (depositMatch) {
    const value = parseInt(depositMatch[1].replace(/,/g, ""))
    console.log(`${value}, deposit`)
    const date = depositMatch[3];
    res.send(`${value}, deposit`);
  }
  else {
    console.log(content)
  }
  res.end();
}

function showData(req, res) {
  res.send("lmao");
}

module.exports = {
  parseContent,
  showData
}

