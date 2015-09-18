var app = angular.module('app', ['ngCordova']);

app.controller('MainCtrl', ['$scope', '$cordovaCamera', '$cordovaImagePicker',
    function ($scope, $cordovaCamera, $cordovaImagePicker) {

    $scope.vm = {};
    $scope.viewAction = {};


    $scope.viewAction.takePhoto = function () {

        var photoOption = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,   //or FILE_URI
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(photoOption).then(function (imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // error
        });
    };


    $scope.viewAction.takePhotoFromAlbum = function () {
        var options = {
            maximumImagesCount: 10,
            width: 800,
            height: 800,
            quality: 80
        };

        $cordovaImagePicker.getPictures(options)
          .then(function (results) {

              angular.forEach(results, function (item) {
                  item = 'data:image/jpeg;base64,'+item;
              });

              $scope.vm.photoList = results;

              for (var i = 0; i < results.length; i++) {
                  console.log('Image URI: ' + results[i]);
              }
          }, function (error) {
              // error getting photos
          });
    };

}]);