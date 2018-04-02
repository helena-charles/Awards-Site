Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('questionsIndex', {
      url: '/questions',
      templateUrl: 'views/questions/index.html',
      controller: 'QuestionsIndexCtrl as questionsIndex'
    })
    .state('questionsShow', {
      url: '/questions/:id',
      templateUrl: 'views/questions/show.html',
      controller: 'QuestionsShowCtrl as questionsShow'
    });

  $urlRouterProvider.otherwise('/questions');
}

export default Router;
