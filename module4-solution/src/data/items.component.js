(function () {
'use strict';

angular.module('data')
.component('items', {
  templateUrl: 'src/templates/items.template.html',
  bindings: {
    items : '<'
  }
});

})();