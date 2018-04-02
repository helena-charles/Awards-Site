import angular from 'angular';
import '@uirouter/angularjs';

import Router from './config/router';
import QuestionsIndexCtrl from './controllers/index';
import QuestionsShowCtrl from './controllers/show';


import Question from './services/question';

import 'bulma';

angular.module('awardsSite', ['ui.router'])
  .config(Router)
  .controller('QuestionsIndexCtrl', QuestionsIndexCtrl)
  .controller('QuestionsShowCtrl', QuestionsShowCtrl)
  .service('Question', Question);
