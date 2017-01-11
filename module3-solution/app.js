(function () {
'use strict';

var NarrowItDownApp = angular.module('NarrowItDownApp', []);
NarrowItDownApp.controller('NarrowItDownController', NarrowItDownController);
NarrowItDownApp.service('MenuSearchService', MenuSearchService);
NarrowItDownApp.constant('MenuBasePath', 'https://davids-restaurant.herokuapp.com');

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var menu = this;
	menu.search = function () {
		var menuItems = MenuSearchService.getMatchedMenuItems();
		return menuItems;
	}
	console.log(menu.search());
}

MenuSearchService.$inject = ['$http', 'MenuBasePath'];
function MenuSearchService($http, MenuBasePath) {
	var menuService = this;
	
	menuService.getMatchedMenuItems = function(searchTerm) {
		var response = $http({
			method : "GET",
			url : (MenuBasePath + "/menu_items.json")
		});
		
		return response.then(function (result) {
			var foundItems = result.data;
			console.log(foundItems);
			return foundItems;
		});
	}
}
})();