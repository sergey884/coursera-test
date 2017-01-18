(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('MenuBasePath', 'https://davids-restaurant.herokuapp.com');

MenuDataService .$inject = ['$http', 'MenuBasePath'];
function MenuDataService($http, MenuBasePath) {
	var dataService = this;
	
	dataService.getAllCategories = function () {
		var response = $http({
			method : "GET",
			url : (MenuBasePath + '/categories.json')
		});
		
		return response.then(function (result) {
			return result.data;
		});
	}
	dataService.getItemsForCategory = function (categoryShortName) {
		var response = $http({
			method : "GET",
			url : (MenuBasePath + '/menu_items.json?category=' + categoryShortName)
		});
		
		return response.then(function (result) {
			return result.data.menu_items;
		});
	}
} 

})();