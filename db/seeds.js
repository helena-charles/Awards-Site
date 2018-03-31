const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Question = require('../models/question');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Question.create([{
    question: 'Most likely to lose all their money at the casino'
  },{
    question: 'Most likely to get married'
  }])
    .then(questions => console.log(`${questions.length} questions created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
