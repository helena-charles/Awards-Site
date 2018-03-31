const router = require('express').Router();
const questions = require('../controllers/questions');
const auth = require('../controllers/auth');

router.route('/questions')
  .get(questions.index)
  .post(questions.create);

router.route('/questions/:id')
  .get(questions.show)
  .put(questions.update)
  .delete(questions.delete);

router.post('/login', auth.login);
router.post('/register', auth.register);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
