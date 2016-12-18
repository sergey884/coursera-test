(function () {
'use strict';

var ShoppingListCheckOff = angular.module('ShoppingListCheckOff', []);

ShoppingListCheckOff.controller('ToBuyController', ToBuyController)
ShoppingListCheckOff.controller('AlreadyBoughtController', AlreadyBoughtController)
ShoppingListCheckOff.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyController($scope, ShoppingListCheckOffService) {
	var showBuyList = this;
	showBuyList.items = ShoppingListCheckOffService.getBuyItems();
	
	showBuyList.empty = ShoppingListCheckOffService.isBuyEmpty();

	showBuyList.removeItem = function (itemIndex) {
		ShoppingListCheckOffService.removeItem(itemIndex);
	};
}

AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
	var showBoughtList = this;
	showBoughtList.items = ShoppingListCheckOffService.getBuoghtItems();
	
	showBoughtList.empty = ShoppingListCheckOffService.isBoughtEmpty();

}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var buy = [ 
	{
      name: "cookies",
      quantity: 10
    },
	{
      name: "apple",
      quantity: 8
    },
	{
      name: "potatoes",
      quantity: 20
    }
  ];
  var bought = [];

  service.removeItem = function (itemIdex) {
    var item = buy.splice(itemIdex, 1);
	bought.push(item[0]);
  };

  service.getBuyItems = function () {
    return buy;
  };
  
  service.getBuoghtItems = function () {
    return bought;
  };
  
  service.isBuyEmpty = function () {
    return !buy.length;
  };
  
   service.isBoughtEmpty = function () {
    return !bought.length;
  };
}

})();