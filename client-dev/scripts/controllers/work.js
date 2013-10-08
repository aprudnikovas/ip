angular.module('tApp')
	.controller('WorkController', ['$scope','$rootScope','$timeout', function ($scope,$rootScope,$timeout) {

		$scope.codeText = '010100100110100101001001001010100101010111001010010010100000001101110010100101001010010011001010101001011001010010101010010010100101011111100100101001001101001010010101111010101010111100001010111001010100110101001010100100110100101001001001010100101010111001010010010100000001101110010100101001010010011001010101001011001010010101010010010100101011111100100101001001101001010010101111010101010111100001010111001010100110101001'

		var codeTimer
		$scope.execCodeTimer = function(){
			codeTimer = $timeout(function() {
				var t = $scope.codeText;
				var a = t.slice(0,t.length - 3)
				var b = t.slice(t.length - 3)
				$scope.codeText = b + a;

				$scope.execCodeTimer()

			}, 200);
		}


		$scope.workData = [{
			imgThumbUrl:'../images/work/underwater_adventures.png',
			imgLargeUrl:'../images/work/underwater_adventures.png',
			title:'Uff title',
			tags:['x','y'],
			summary:'This is summary',
			htmlText:'<p>Some main text</p>'
		}]


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
