var app = angular.module('app', ['ngMaterial']);
app.controller('mainController', function($scope, flickrService){

    $scope.srcUrl;
    $scope.showPhotos;
    $scope.data = {
        searchText: ""
    }
    $scope.showRecentPhotos = function(){
        console.log("In Ctrl")
        //$scope.photos = flickrService.getRecentPhotos(url);
        flickrService.then(function(response){
                console.log("Called");
                console.log(response);
                $scope.photos = response.data.photos.photo;
                console.log($scope.photos);
                getImageSrc($scope.photos);
             });
    }

    var getImageSrc = function(photos){
        $scope.srcUrl=null;
        $scope.showPhotos = false;
        var imgUrl = [];
        angular.forEach(photos, function (photo) {
        //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
        var obj = {};
            obj.src = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg";
            obj.title = photo.title;
            imgUrl.push(obj);
        });

        console.log(imgUrl);
        $scope.srcUrl = imgUrl;
        $scope.showPhotos = true;
    }

    $scope.search = function(){
        console.log($scope.data.searchText);
        var filtered = [];
        angular.forEach($scope.photos, function(photo) {
        console.log(photo.title);
            if( photo.title.indexOf($scope.data.searchText) >= 0 )
                filtered.push(photo);
        });

        getImageSrc(filtered);
    }
});
