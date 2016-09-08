// Service to provide OMDB data
angular.module('omdb', [])
  .factory('omdbApi', function($http, $q) {
    // The object returned by this service ('omdbApi') is exposed as an argument
    // to the callback in angular.mock.inject(), which is registered with the
    // 'omdb' module
    var service = {};
    var baseUrl = 'http://www.omdbapi.com/?v=1&';

    function httpPromise(url) {
      var deferred = $q.defer();
      $http.get(url)
           .success(function(data) {
             deferred.resolve(data);
           })
           .error(function() {
             deferred.reject();
           });
      return deferred.promise;
    }

    service.search = function(query) {
      return httpPromise(baseUrl + 's=' + encodeURIComponent(query));
    };

    service.find = function(id) {
      return httpPromise(baseUrl + 'i=' + id);
    };

    return service;
  });
