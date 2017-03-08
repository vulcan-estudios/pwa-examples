const express = require('express');
const bodyParser = require('body-parser');
const MDB = require('prhone-mdb');

const TABLE_COOKS = 'cooks';
const TABLE_FRUITS = 'fruits';
const TABLE_RECIPES = 'recipes';
const TABLE_JUICES = 'juices';
const MOCK_DELAY = 750;
const port = process.env.PORT || 4000;
const app = express();
const db = new MDB(`${process.cwd()}/server/database.json`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${process.cwd()}/public`));

app.get('/api/cooks', function (req, res) {
  setTimeout(() => db.getAll(TABLE_COOKS).then(items => res.json(items)), MOCK_DELAY);
});

app.get('/api/fruits', function (req, res) {
  setTimeout(() => db.getAll(TABLE_FRUITS).then(items => res.json(items)), MOCK_DELAY);
});

app.get('/api/recipes', function (req, res) {
  setTimeout(() => db.getAll(TABLE_RECIPES).then(items => res.json(items)), MOCK_DELAY);
});

app.get('/api/juices', function (req, res) {
  setTimeout(() => db.getAll(TABLE_JUICES).then(items => res.json(items)), MOCK_DELAY);
});

app.post('/api/juices', function (req, res) {
  const juice = Object.assign({}, req.body, { date: Date.now() });
  setTimeout(() => db.create(TABLE_JUICES, juice).then(created => res.json(created)), MOCK_DELAY);
});

app.listen(port, function (err) {
  if (err) throw err;
  console.log(`Server running at http://127.0.0.1:${port}`);
});
