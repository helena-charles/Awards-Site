const router = require('express').Router();
const questions = require('../controllers/questions');

router.route('/questions')
  .get(questions.index);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
