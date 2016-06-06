(function() {
    console.clear();
    'use strict';

    var validationApp = angular.module('validationApp', []);

    validationApp.controller('MainController', function MainController() {
      var vm = this;

      vm.onSubmit = onSubmit;
      vm.model = {};
      vm.options = {};

      function onSubmit() {
        if (vm.form.$valid) {
          vm.options;
        }
      }

  });
})();
