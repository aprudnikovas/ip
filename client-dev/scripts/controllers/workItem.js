angular.module('tApp')
	.controller('WorkItemController', ['$scope','$stateParams', function ($scope,$stateParams) {

		$scope.workData = {}

		var id = $stateParams.itemId



		console.log("work item id:"+id);

		$scope.workItem = $scope.workData

		$scope.$on("$destroy", function() {

		});

	}]);
