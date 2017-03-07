const express = require('express');
const bodyParser = require('body-parser');
const MDB = require('prhone-mdb');

const port = process.env.PORT || 4000;
const app = express();
const database = new MDB(`${process.cwd()}/server/database.json`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${process.cwd()}/public`));

// TODO: API.

app.listen(port, function (err) {
  if (err) throw err;
  console.log(`Server running at http://127.0.0.1:${port}`);
});
