(function() {
    console.clear();
    'use strict';

    var app = angular.module('formlyApp', ['formly', 'formlyBootstrap', 'ngAnimate', 'ngMessages']);

    app.run(function(formlyConfig, formlyValidationMessages) {
      formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';

      formlyValidationMessages.addStringMessage('required', 'This field is required');
    });

    // app.config(function (formlyConfigProvider) {
    //   formlyConfigProvider.setWrapper({
    //     name: 'validation',
    //     types: ['input'],
    //     templateUrl: 'error-messages.html'
    //   });
    // });



    app.controller('MainController', function MainController() {
      var vm = this;

      vm.onSubmit = onSubmit;
      vm.model = {};
      vm.options = {};

      vm.fields = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Name',
            placeholder: 'Enter your name',
            required: true
          }
        },
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            type: 'email',
            label: 'Email',
            placeholder: 'Enter your email address',
            required: true
          }
        },
        {
          key: 'project',
          type: 'select',
          templateOptions: {
            label: 'Project',
            options: [
              {
                "name": "ACAF 4.0",
                "value": "acaf_4_0"
              },
              {
                "name": "ACAF 5.0",
                "value": "acaf_5_0"
              },
              {
                "name": "Drift-SAR",
                "value": "drift_sar"
              }
            ]
          }
        },
        {
          key: 'url',
          type: 'input',
          templateOptions: {
            type: 'url',
            label: 'Share URL',
            placeholder: 'Please share your URL',
            required: false
          }
        },
        {
          key: 'issue',
          type: 'input',
          templateOptions: {
            type: 'issue',
            label: 'Issue',
            placeholder: 'Please describe the issue',
            required: true
          }
        }
      ];

      function onSubmit() {
        if (vm.form.$valid) {
          vm.options.updateInitialValue();
        }
      }

  });
})();
