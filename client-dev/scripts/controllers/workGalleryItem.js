angular.module('tApp')
	.controller('WorkItemController', ['WorkData','$scope','$stateParams', function (WorkData, $scope, $stateParams) {

		var id = $stateParams.itemId

		var projects = WorkData.data().projects;

		$scope.project = _.find(projects, function(project){ return project.id == id })

	}]);
