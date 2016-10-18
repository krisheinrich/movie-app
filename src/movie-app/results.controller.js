angular.module('movieApp')
  .controller('ResultsController', function ($scope, $location, $exceptionHandler, omdbApi) {
    var query = $location.search().q;
    omdbApi.search(query)
      .then(function (data) {
        $scope.results = data.Search;
      })
      .catch(function (e) {
        $exceptionHandler(e);
      });

    $scope.toggleExpand = function (index, id) {
      omdbApi.find(id)
        .then(function (data) {
          $scope.results[index].data = data;
          $scope.results[index].open = true;
        });
    }
  });
