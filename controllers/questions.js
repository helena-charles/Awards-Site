const Question = require('../models/question');

function indexRoute(req, res, next) {
  Question.find()
    .then(questions => res.json(questions))
    .catch(next);
}

module.exports = {
  index: indexRoute
};
