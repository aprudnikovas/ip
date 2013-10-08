angular.module('tApp')
	.controller('MenuController', ['$scope','$rootScope', function ($scope,$rootScope) {

		$scope.menuIsActive = $rootScope.menuIsActive;

		$scope.activeMenuClass = "menu-activated";

		$scope.toggleNavigation = function(){
			$rootScope.menuIsActive = ! $rootScope.menuIsActive;
			$scope.menuIsActive = $rootScope.menuIsActive;

			if(!!$scope.menuIsActive)
				$('body').addClass($scope.activeMenuClass)
			else
				$('body').removeClass($scope.activeMenuClass)
		}

	}]);
