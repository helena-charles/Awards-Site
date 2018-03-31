Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('questionsIndex', {
      url: '/questions',
      templateUrl: 'views/questions/index.html',
      controller: 'QuestionsIndexCtrl as questionsIndex'
    });

  $urlRouterProvider.otherwise('/questions');
}

export default Router;
