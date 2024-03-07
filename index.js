const express = require("express");
const bodyParser = require("body-parser");

const contentController = require('./controllers/content.controller')


app = express();
app.use(bodyParser.text());

app.post('/', contentController.parseContent);

app.listen(3000, () => {
  console.log('listening')
})





