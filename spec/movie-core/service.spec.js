describe('MovieCore', function() {

  var PopularMovies,
      $httpBackend;

  /* Load Angular module and get component instance from module
     before each test */
  beforeEach(angular.mock.module('movieCore'));
  beforeEach(angular.mock.inject(function(_PopularMovies_, _$httpBackend_) {
    PopularMovies = _PopularMovies_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  // Unit Tests

  it('should create popular movie', function() {

    var expectedData = {"movieId":"tt00776759","description":"Great movie!"};
    $httpBackend.expectPOST(/./, expectedData)
      .respond(201);

    var popularMovie = new PopularMovies({
      movieId: 'tt00776759',
      description: 'Great movie!'
    });
    popularMovie.$save();

    expect($httpBackend.flush).not.toThrow();
  });

  it('should get popular movies by id', function() {

    $httpBackend.expectGET('popular/tt0076759').respond(200);

    PopularMovies.get({ movieId: 'tt0076759' });

    expect($httpBackend.flush).not.toThrow();
  });

  it('should update popular movie', function() {

    $httpBackend.expectPUT('popular').respond(200);

    var popularMovie = new PopularMovies({
      movieId: 'tt00776759',
      description: 'Great movie!'
    });
    popularMovie.$update();

    expect($httpBackend.flush).not.toThrow();
  });

    it('should authenticate requests', function() {
      var expectedHeaders = function(headers) {
        return angular.fromJson(headers).authToken === 'teddybear';
      };
      $httpBackend.expectGET('popular/tt0076759', expectedHeaders).respond(200);
      PopularMovies.get({ movieId: 'tt0076759' });
      $httpBackend.flush(1);
    });

});
