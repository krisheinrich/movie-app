describe('Home Controller', function () {

  var $scope = {},
      $controller,
      $interval,
      $q,
      $rootScope,
      $exceptionHandler,
      omdbApi,
      PopularMovies;
  var results = [
    {
      "Title": "Star Wars: Episode IV - A New Hope",
      "imdbID": "tt0076759"
    },
    {
      "Title": "Star Wars: Episode V - The Empire Strikes Back",
      "imdbID": "tt0080684"
    },
    {
      "Title": "Star Wars: Episode VI - Return of the Jedi",
      "imdbID": "tt0086190"
    }
  ];

  beforeEach(module('movieApp'));

  beforeEach(module(function ($exceptionHandlerProvider) {
    $exceptionHandlerProvider.mode('log');
  }));

  beforeEach(inject(function (_$q_, _omdbApi_) {
    spyOn(_omdbApi_, 'find').and.callFake(function () {
      var deferred = _$q_.defer();
      var args = _omdbApi_.find.calls.mostRecent().args[0];
      switch (args) {
        case 'tt0076759':
          deferred.resolve(results[0]); break;
        case 'tt0080684':
          deferred.resolve(results[1]); break;
        case 'tt0086190':
          deferred.resolve(results[2]); break;
        case 'ttError':
          deferred.reject("Error finding movie"); break;
        default:
          deferred.reject();
      }
      return deferred.promise;
    });
  }));

  beforeEach(inject(function (_$controller_, _$interval_, _$q_, _$rootScope_, _$exceptionHandler_, _omdbApi_, _PopularMovies_) {
    $scope = {};
    $controller = _$controller_;
    $interval = _$interval_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $exceptionHandler = _$exceptionHandler_;
    omdbApi = _omdbApi_;
    PopularMovies = _PopularMovies_;
  }));

  /******************************** TESTS ********************************/

  it('should rotate movies every 5 seconds', function () {
    spyOn(PopularMovies, 'query').and.callFake(function (cb) {
      cb(['tt0076759', 'tt0080684', 'tt0086190']);
    });

    $controller('HomeController', {
      $scope: $scope,
      $interval: $interval,
      omdbApi: omdbApi,
      PopularMovies: PopularMovies
    });
    $rootScope.$apply();

    // should have default movie
    expect($scope.result.Title).toEqual(results[0].Title);
    // should update after 5 seconds
    $interval.flush(5000);
    expect($scope.result.Title).toBe(results[1].Title);
    // should update after 5 seconds
    $interval.flush(5000);
    expect($scope.result.Title).toBe(results[2].Title);
    // should return to default
    $interval.flush(5000);
    expect($scope.result.Title).toBe(results[0].Title);
  });

  it('should handle error', function () {
    spyOn(PopularMovies, 'query').and.callFake(function (cb) {
      cb(['tt0076759', 'tt0080684', 'tt0086190', 'ttError']);
    });

    $controller('HomeController', {
      $scope: $scope,
      $interval: $interval,
      omdbApi: omdbApi,
      PopularMovies: PopularMovies
    });
    $rootScope.$apply()

    // should have default movie
    expect($scope.result.Title).toEqual(results[0].Title);
    // should update after 5 seconds
    $interval.flush(5000);
    expect($scope.result.Title).toBe(results[1].Title);
    // should update after 5 seconds
    $interval.flush(5000);
    expect($scope.result.Title).toBe(results[2].Title);
    // should return to default
    $interval.flush(5000);

    expect($exceptionHandler.errors).toEqual(['Error finding movie']);
  });

});
