(function () {
'use strict';

angular.module('data')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // categories list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.view.html',
    controller: 'CategoriesListController as categoriesList',
	resolve : {
		items : ['MenuDataService', function (MenuDataService) {
			return MenuDataService.getAllCategories();
		}]
	}
  })
  
  // items list page
   .state('items', {
		url: '/items/{categoryShortName}',
		templateUrl: 'src/templates/items.view.html',
		controller: 'ItemListController as itemList',
		resolve : {
			items : ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
				return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
			}]
		}
  });
}

})();
