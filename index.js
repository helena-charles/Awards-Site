const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const router = require('./config/router');

const { dbURI, port } = require('./config/environment');

let nothing = 1;
let votingOpen = true;

const app = express();
app.use(express.static(`${__dirname}/public`));

mongoose.connect(dbURI);
app.use(bodyParser.json());


app.use('/api', router);

app.post('/voting', (req, res) => {
  votingOpen = req.body.votingOpen;
  // console.log(req.params);
  res.status(200).send();
});

app.get('/voting/voting-status', (req, res) => {
  res.send({votingOpen});
});

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use((err, req,res,next) => {

  if (err.name === 'ValidationError') res.status(422).json({ message: err.message });
  res.status(500).json({ message: 'Internal Server Error '});
  next();
});

app.listen(port, () => console.log(`Aye aye captain, pulling into port ${port}`));

module.exports = app;
