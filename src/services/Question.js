Question.$inject = ['$http'];

function Question($http) {
  function find() {
    return $http.get('/api/questions');
  }

  function findById(id) {
    return $http.get(`/api/questions/${id}`);
  }

  this.find = find;
  this.findById = findById;

}

export default Question;
