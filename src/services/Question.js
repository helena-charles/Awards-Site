Question.$inject = ['$http'];

function Question($http) {
  function find() {
    return $http.get('/api/questions');
  }

  this.find = find;
}

export default Question;
