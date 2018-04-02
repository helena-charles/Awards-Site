QuestionsShowCtrl.$inject = ['Question', ' $state'];

function QuestionsShowCtrl(Question, $state) {
  const vm = this;
  vm.voteQuestions = {};

  Question.findById($state.params.id)
    .then(res => {
      vm.voteQuestions = res.data;
      console.log(vm.voteQuestions);
    });

}

export default QuestionsShowCtrl;
