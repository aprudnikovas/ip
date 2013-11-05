angular.module('tApp')
	.controller('WorkGalleryController', ['Projects','$scope','$rootScope','$timeout','$stateParams',
		function (Projects,$scope,$rootScope,$timeout,$stateParams) {

		var codeTimer, params = $stateParams;


		// watch state params changes and renew data
		////////////////////////////////////////////
		$scope.$watch('params', function(){

			$scope.max = parseInt(params.max) || 6;
			$scope.offset = parseInt(params.offset) || 0;

			$scope.prevOffset = ($scope.offset - $scope.max) > 0 ? ($scope.offset - $scope.max) : 0;
			$scope.nextOffset = $scope.offset + $scope.max

			Projects.data().then(function(projects){
				$scope.projects = projects.slice($scope.offset,($scope.max + $scope.offset));
			})

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
