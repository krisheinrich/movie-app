angular.module('movieApp')
  .controller('ResultsController', function ($scope, $location, $exceptionHandler, omdbApi) {
    var query = $location.search().q;
    omdbApi.search(query)
      .then(function (data) {
        // Store search data
        $scope.results = data.Search;
      })
      .catch(function (e) {
        $exceptionHandler(e);
      });

    $scope.toggleExpand = function (index, id) {
      omdbApi.find(id)
        .then(function (data) {
        $scope.results[index].data = data;
        console.log($scope.results[index].data.Poster);
        // Replace any missing img links with the default image links
        if ($scope.results[index].data.Poster === "N/A") {
          $scope.results[index].data.Poster = "./no_image.png";
        }
        });
    }
  });
