angular.module('movieApp', ['ui.bootstrap', 'ngRoute', 'omdb', 'movieCore', 'ngMockE2E'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'movie-app/home.html',
        controller: 'HomeController'
      })
      .when('/results', {
        templateUrl: 'movie-app/results.html',
        controller: 'ResultsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($httpBackend) {
    var data = ['tt3774114', 'tt0454876', 'tt2488496',  'tt0071853',
      'tt0110912', 'tt0462538', 'tt0092005', 'tt1386697', 'tt1951266', ],
        headers = {
          headers: {'Content-Type': 'application/json'}
        };

        // Return Popular Movie IDs
        $httpBackend.whenGET(function (s) {
          return (s.indexOf('popular') !== -1);
        }).respond(200, data, headers);

        $httpBackend.whenGET(/.*/).passThrough();
  });
