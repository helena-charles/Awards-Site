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
    question: 'Most likely to be incarcerated for a DDOS attack',
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
  },{
    question: 'Biggest Twat',
    moderated: true
  },{
    question: 'Funniest Student',
    moderated: true
  },{
    question: 'Least likely to get drunk',
    moderated: true
  },{
    question: 'Most helpful student',
    moderated: true
  },{
    question: 'Most likely to retire at 40',
    moderated: true
  },{
    question: 'Most likely to suddenly speak French',
    moderated: true
  },{
    question: 'Saltiest student',
    moderated: true
  },{
    question: 'Biggest swearer',
    moderated: true
  },{
    question: 'Best dressed',
    moderated: true
  },{
    question: 'Least hair',
    moderated: true
  },{
    question: 'Most hair',
    moderated: true
  },{
    question: 'Most dramatic makeover throughout the course',
    moderated: true
  },{
    question: 'Most likely to correct you on their name pronunciation',
    moderated: true
  },{
    question: 'Most likely to say "cool" at the beginning of their stand up speech',
    moderated: true
  },{
    question: 'Most likely to tell you their life story',
    moderated: true
  },{
    question: 'Shortest stand up',
    moderated: true
  },{
    question: 'Longest stand up',
    moderated: true
  },{
    question: 'Best dog owner',
    moderated: true
  }])
    .then(questions => console.log(`${questions.length} questions created`))
    .catch(err => console.log(err))
    .then(() => User.create([
      {
        username: 'Admin',
        email: 'admin@admin.com',
        password: 'adminpassword',
        passwordConfirmation: 'adminpassword',
        admin: true
      }])
    )
    .then(users => console.log(`${users.length} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
