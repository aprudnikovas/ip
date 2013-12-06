angular.module('tApp')
	.controller('MenuController', ['$scope','$state','$rootScope',
		function ($scope,$state,$rootScope) {


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


		$scope.stateMatches =  function(stateName){

			var regexp = new RegExp("^" + stateName + ".*");

			return !!$state.current.name.match(regexp);

		}

	}]);
