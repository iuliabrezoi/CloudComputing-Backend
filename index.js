const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const messagesRouter = require('./router/messagesRouter');
const utileRouter = require('./router/utileRouter');
const {sendMAIL} = require("./utile/mail.js");

const app = express();
app.use(cors());

//parsing application/json
app.use(bodyParser.json());

//parsing application/xwww-
app.use(bodyParser.urlencoded({extended: true}));

app.use("/messages",messagesRouter);
app.use("/utile",utileRouter);

const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log(`Cloud computing app listening on port ${port}!`)
  });

