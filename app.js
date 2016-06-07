(function() {
    console.clear();
    'use strict';

    var app = angular.module('fileUpload', ['ngFileUpload']);

    app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function($scope, Upload, $timeout) {
        $scope.uploadFile = function(file) {
            file.upload = Upload.upload({
                url: '/assets/mailgun.php',
                data: {
                    file: file,
                    'name': $scope.name
                },
            });

            file.upload.then(function(resp) {
              $timeout(function() {
                file.result = response.data;
              });
            }, function(resp) {
              if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
          };
        // // for multiple files:
        // $scope.uploadFiles = function (files) {
        //   if (files && files.length) {
        //     for (var i = 0; i < files.length; i++) {
        //       Upload.upload({..., data: {file: files[i]}, ...})...;
        //     }
        //     // or send them all together for HTML5 browsers:
        //     Upload.upload({..., data: {file: files}, ...})...;
        //   }
        // }
    }]);
})();
