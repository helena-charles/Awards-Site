QuestionsIndexCtrl.$inject = ['Question'];
function QuestionsIndexCtrl(Question) {
  const vm = this;

  vm.voteQuestions = [];

  Question.find()
    .then(res => vm.voteQuestions = res.data);
}

export default QuestionsIndexCtrl;
