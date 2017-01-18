(function () {
'use strict';

angular.module('data')
.component('categories', {
  templateUrl: 'src/templates/categories.template.html',
  bindings: {
    categories : '<'
  }
});

})();
