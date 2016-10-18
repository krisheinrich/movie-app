angular.module('movieApp')
  .directive('movieResult', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        result: '=result'
      },
      template: [
        '<div class="row front-main" ng-show="result">',
          '<div class="col-sm-4">',
            '<img class="poster" ng-src="{{result.Poster}}" alt="{{result.Title}}"/>',
          '</div>',
          '<div class="col-sm-8">',
            '<h2><strong>{{ result.Title }}</strong></h2>',
            '<p>{{ result.Plot }}</p>',
            '<p class="row"><span class="col-sm-6"><strong>Director:</strong> {{ result.Director }}</span><span class="col-sm-6"><strong>Rating:</strong> {{ result.Rated }}</span></p>',
            '<p><strong>Actors:</strong> {{ result.Actors }}</p>',
            '<p><strong>Released:</strong> {{ result.Released }}</p>',
            '<p><strong>Genre:</strong> {{ result.Genre }}</p>',
            '<a href="http://www.imdb.com/title/{{ result.imdbID }}">View on IMDB</a>',
          '</div>',
        '</div>',
      ].join('')
    };
  });
