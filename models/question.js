const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {type: String, minlength: 2},
  votes: [{ type: String }],
  alreadyVoted: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  moderated: { type: Boolean, default: false }
});

module.exports = mongoose.model('Question', questionSchema);
