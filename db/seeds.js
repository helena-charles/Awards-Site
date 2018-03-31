const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Question = require('../models/question');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  User.create([
    {
      username: 'Helena',
      email: 'helena@helena.com',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      username: 'Abi',
      email: 'abi@abi.com',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      username: 'Jess',
      email: 'jess@jess.com',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      username: 'Katie',
      email: 'katie@katie.com',
      password: 'password',
      passwordConfirmation: 'password'
    }]);

  Question.create([{
    question: 'Most likely to lose all their money at the casino'
  },{
    question: 'Most likely to get married'
  }])
    .then(questions => console.log(`${questions.length} questions created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
