import angular from 'angular';
import '@uirouter/angularjs';

import Router from './config/router';
import QuestionsIndexCtrl from './controllers/index';

import Question from './services/question';

import 'bulma';

angular.module('awardsSite', ['ui.router'])
  .config(Router)
  .controller('QuestionsIndexCtrl', QuestionsIndexCtrl)
  .service('Question', Question);
