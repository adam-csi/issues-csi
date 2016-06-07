(function() {
  console.clear();
  'use strict';

  var app = angular.module('fileUpload', ['ngFileUpload']);

  app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function($scope, Upload, $timeout) {
              $scope.onFileSelect = function(file) {
                      file.upload = Upload.upload({
                          url: '/assets/mailgun.php',
                          data: {
                              file: file,
                              'name': $scope.name
                          },
                      }).then(function(resp) {
                          console.log(resp.data);
                      });
                  },
                  function(resp) {
                      if (response.status > 0)
                          $scope.errorMsg = response.status + ': ' + response.data;
                  },
                  function(evt) {
                      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                  };
      }
  ]);
})();
