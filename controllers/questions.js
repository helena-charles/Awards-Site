const Question = require('../models/question');

function indexRoute(req, res, next) {
  Question.find()
    .then(questions => res.json(questions))
    .catch(next);
}

function createRoute(req, res, next) {
  Question.create(req.body)
    .then(question => res.status(201).json(question))
    .catch(next);
}

function showRoute(req, res, next) {
  Question.findById(req.params.id)
    .then(question => res.json(question))
    .catch(next);
}

function updateRoute(req, res, next) {
  Question.findById(req.params.id)
    .then(question => Object.assign(question, req.body))
    .then(question => question.save())
    .then(place => res.json(place))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Question.findById(req.params.id)
    .then(question => question.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
