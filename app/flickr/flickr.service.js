app.factory('flickrService', function($http){
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=2e8bdce82dbd833ce4c2ca88bc6c74eb&per_page=10&format=json&nojsoncallback=1";
    return $http.get(url);
});
