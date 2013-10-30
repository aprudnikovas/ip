angular.module('tApp')
	.controller('WorkController', ['WorkData','$scope','$rootScope','$timeout', function (WorkData,$scope,$rootScope,$timeout) {

		var yearHeight, yearLabelHeight, monthHeight, codeTimer;

		yearHeight = 116;
		yearLabelHeight = 20;
		monthHeight = (yearHeight - yearLabelHeight) / 12;

		$scope.workHistoryData = WorkData.data();

		$scope.jobLineHeight = function(job){
			return ($scope.jobDistanceFromNow(job) - $scope.jobDistanceToEnd(job))
		}

		$scope.jobDistanceToEnd = function(job){
			var toDate = new Date();
			if(job.to)
				toDate.setTime( job.to );
			var year = toDate.getFullYear();
			var month = toDate.getMonth() + 1;
			var yearsFromNow = (new Date).getFullYear() - year;

			return ( (yearsFromNow + 1) * yearHeight - (month * monthHeight) - yearLabelHeight );
		}

		$scope.jobDistanceFromNow = function(job){
			var fromDate = new Date();
			fromDate.setTime( job.from );
			var year = fromDate.getFullYear();
			var month = fromDate.getMonth() + 1;
			var yearsFromNow = (new Date).getFullYear() - year;

			return ( (yearsFromNow + 1) * yearHeight - (month * monthHeight) - yearLabelHeight );
		}


		// MOVING TEXT

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