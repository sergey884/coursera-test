(function () {
'use strict';

var LunchCheck = angular.module('LunchCheck', []);

LunchCheck.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
	$scope.cl_enjoy = "hide";
	$scope.cl_too_much = "hide";
	$scope.cl_empty = "hide";
	$scope.txt_border = '';
	
	$scope.checkLunch = function () {
		
		if (!$scope.text) {
			$scope.cl_enjoy = "hide";
			$scope.cl_too_much = "hide";
			$scope.cl_empty = "show";
			$scope.txt_border = 'red_b_color';
			return;
		}
		var textArr = $scope.text.replace(/\s+/g, '').replace(/,+/g, ',').replace(/^,|,$/g, '').split(',');
		console.log(textArr);
		$scope.cl_empty = "hide";
		$scope.txt_border = 'gr_b_color';
		if (textArr.length <= 3) {
			$scope.cl_enjoy = "show";
			$scope.cl_too_much = "hide";
		} else {
			$scope.cl_enjoy = "hide";
			$scope.cl_too_much = "show";
		}
	}
}
})();