angular.module('tApp')
	.controller('FooterController', ['$scope','$state','$rootScope',
		function ($scope,$state,$rootScope) {

		$scope.date = new Date();

		$scope.links = {
			github: "http://github.com/ivarprudnikov",
			stackoverflow: "http://stackoverflow.com/users/906265/ivarprudnikov",
			twitter: "https://twitter.com/ivarPrudnikov"
		}

	}]);
