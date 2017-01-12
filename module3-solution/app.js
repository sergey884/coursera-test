(function () {
'use strict';

var NarrowItDownApp = angular.module('NarrowItDownApp', []);
NarrowItDownApp.controller('NarrowItDownController', NarrowItDownController);
NarrowItDownApp.service('MenuSearchService', MenuSearchService);
NarrowItDownApp.constant('MenuBasePath', 'https://davids-restaurant.herokuapp.com');
NarrowItDownApp.directive('foundItems', foundItemsDirective)

function foundItemsDirective() {
	var ddo = {
		templateUrl : "foundItems.html",
		scope : {
			items : "<",
			onRemove: '&'
		},
		controller: NarrowItDownController,
		controllerAs: 'menu',
		bindToController: true
	};
	
	return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var menu = this;
	menu.searchTerm = '';
	menu.emptyString = "";
	menu.search = function (searchTerm) {
		if (!searchTerm) {
			menu.emptyString = 'Nothing found!';
			menu.found = [];
			return;
		}
		var menuItems = MenuSearchService.getMatchedMenuItems(searchTerm);
		menuItems.then(function (result) {
			menu.found = result;
			if (!menu.found.length) {
				menu.emptyString = 'Nothing found!';
				return;
			} else {
				menu.emptyString = '';
			}
			console.log(menu.found);
		});
	}
	
	menu.removeItem = function (itemIndex) {
		MenuSearchService.removeItem(itemIndex);
	}
}

MenuSearchService.$inject = ['$http', 'MenuBasePath'];
function MenuSearchService($http, MenuBasePath) {
	var menuService = this;
	var foundItems = [];
	
	menuService.getMatchedMenuItems = function(searchTerm) {
		var response = $http({
			method : "GET",
			url : (MenuBasePath + "/menu_items.json")
		});
		
		return response.then(function (result) {
		
			var menu_items = result.data.menu_items;
			console.log(menu_items);
			var i, menu_items_length = menu_items.length;
			var sTerm = '';
			if (searchTerm) {
				sTerm = searchTerm.replace(/^\s+|\s+$/, '');
			}
			var searchReg = new RegExp(sTerm, 'i');
			
			if (foundItems.length) foundItems = [];
			
			for (var i = 0; i < menu_items_length; i++) {
				if (searchReg.test(menu_items[i].description)) {
					foundItems.push(menu_items[i]);
				}
			}
			
			return foundItems;
		});
	}
	
	menuService.removeItem = function (itemIndex) {
		foundItems.splice(itemIndex, 1);
	};
}
})();