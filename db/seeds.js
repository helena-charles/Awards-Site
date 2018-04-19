const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Question = require('../models/question');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Question.create([{
    question: 'Most likely to lose all their money at the casino',
    moderated: true
  },{
    question: 'Best breakdancer',
    moderated: true
  },{
    question: 'Most likely to quit it all and do something else',
    moderated: true
  },{
    question: 'Most likely to go to prison',
    moderated: true
  },{
    question: 'Biggest, dreamiest eyes',
    moderated: true
  },{
    question: 'Biggest Boozer',
    moderated: true
  },{
    question: 'Best Laugh',
    moderated: true
  },{
    question: 'Most likely to be a gold digger',
    moderated: true
  },{
    question: 'Most likely to be the next Mark Zuckerberg',
    moderated: true
  },{
    question: 'Most likely to get drunk and take their dick out',
    moderated: true
  },{
    question: 'Most likely to become a web design master',
    moderated: true
  },{
    question: 'Most likely to be a bitch at stand up',
    moderated: true
  },{
    question: 'Teacher\'s Pet',
    moderated: true
  },{
    question: 'Best Stand Up speaker',
    moderated: true
  },{
    question: 'Most likely to never be on time',
    moderated: true
  }])
    .then(questions => console.log(`${questions.length} questions created`))
    .catch(err => console.log(err))
    .then(() => User.create([
      {
        username: 'Helena',
        email: 'helena@helena.com',
        password: 'dancehallmami',
        passwordConfirmation: 'dancehallmami',
        admin: true
      },{
        username: 'Abi',
        email: 'abi@abi.com',
        password: 'theonlygayinthevillage',
        passwordConfirmation: 'theonlygayinthevillage',
        admin: true
      },{
        username: 'Jess',
        email: 'jess@jess.com',
        password: 'shesacoldheartedsnake',
        passwordConfirmation: 'shesacoldheartedsnake',
        admin: true
      },{
        username: 'Katie',
        email: 'katie@katie.com',
        password: 'documentaryfreak',
        passwordConfirmation: 'documentaryfreak',
        admin: true
      }])
    )
    .then(users => console.log(`${users.length} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
