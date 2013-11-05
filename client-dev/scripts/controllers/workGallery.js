angular.module('tApp')
	.controller('WorkGalleryController', ['Projects','Companies','$scope','$rootScope','$timeout','$stateParams',
		function (Projects,Companies,$scope,$rootScope,$timeout,$stateParams) {

		var codeTimer, params = $stateParams;


		// watch state params changes and renew data
		////////////////////////////////////////////
		$scope.$watch('params', function(){

			$scope.max = parseInt(params.max) || 6;
			$scope.offset = parseInt(params.offset) || 0;
			$scope.company_id = params.company_id || "";

			Companies.data().then(function(companies){

				

			});

			Projects.data().then(function(projects){

				var filteredByProperty = projects, filtered;

				if( !!parseInt($scope.company_id) )
					filteredByProperty = _.filter(projects, function(proj){ return proj.company_id === ($scope.company_id + "") })

				filtered = filteredByProperty.slice($scope.offset,($scope.max + $scope.offset));

				$scope.projects = filtered;
				$scope.prevOffset = ($scope.offset - $scope.max) > -1 ? ($scope.offset - $scope.max) : null;
				$scope.nextOffset = ($scope.offset + $scope.max) >= filteredByProperty.length ? null : ($scope.offset + $scope.max)
			});

		});


		// MOVING TEXT
		///////////////////
		$scope.codeText = '010100100110100101001001001010100101010111001010010010100000001101110010100101001010010011001010101001011001010010101010010010100101011111100100101001001101001010010101111010101010111100001010111001010100110101001010100100110100101001001001010100101010111001010010010100000001101110010100101001010010011001010101001011001010010101010010010100101011111100100101001001101001010010101111010101010111100001010111001010100110101001'

		$scope.execCodeTimer = function(){
			codeTimer = $timeout(function() {
				var t = $scope.codeText;
				var a = t.slice(0,t.length - 3);
				var b = t.slice(t.length - 3);
				$scope.codeText = b + a;

				$scope.execCodeTimer();

			}, 200);
		}


		// EXECUTE TIMERS
		//////////////////////
		$scope.execCodeTimer()


		// CLEANUP
		//////////////////////

		$scope.$on("$destroy", function() {
			if (codeTimer) {
				$timeout.cancel(codeTimer);
			}
		});

	}]);
