(function(){

  'use strict';

  angular

    .module('formlyApp')
    .factory('projects', project);

    function project() {
      function getProjects() {
        return [
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
        ];
      }
      return {
        getProjects: getProjects
      }
    }
})();
