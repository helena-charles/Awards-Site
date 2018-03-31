const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {type: String, minlength: 2},
  votes: [{ type: String }],
  alreadyVoted: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Question', questionSchema);
