angular.module('tApp')
	.controller('HireController', ['$scope','$rootScope','$timeout', function ($scope,$rootScope,$timeout) {

		$scope.codeText = '010100100110100101001001001010100101010111001010010010100000001101110010100101001010010011001010101001011001010010101010010010100101011111100100101001001101001010010101111010101010111100001010111001010100110101001010100100110100101001001001010100101010111001010010010100000001101110010100101001010010011001010101001011001010010101010010010100101011111100100101001001101001010010101111010101010111100001010111001010100110101001'

		var timer;

		$scope.project_types = [
			{ id:1, active:true, name:'Open source'},
			{ id:2, active:true, name:'Private B2B'},
			{ id:3, active:true, name:'Private B2C'},
			{ id:4, active:true, name:'Other'}
		];

		$scope.person_represents = [
			{ id:1, active:true, name:'HR agency'},
			{ id:2, active:true, name:'Private company'},
			{ id:3, active:true, name:'Project'},
			{ id:4, active:true, name:'Other'}
		]

		$scope.enquiry_types = [
			{ id:1, active:true, name:'Contract role'},
			{ id:2, active:false, name:'Permanent role'},
			{ id:3, active:true, name:'Help required for existing project'},
			{ id:4, active:true, name:'I have an idea'},
			{ id:5, active:true, name:'Join our startup'},
			{ id:6, active:true, name:'Other'}
		];



		$scope.execTimer = function(){
			timer = $timeout(function() {
				var t = $scope.codeText;
				var a = t.slice(0,t.length - 3)
				var b = t.slice(t.length - 3)
				$scope.codeText = b + a;

				$scope.execTimer()

			}, 200);
		}

		$scope.execTimer()

		$scope.$on("$destroy", function() {
			if (stop) {
				$timeout.cancel(timer);
			}
		});

	}]);
