angular.module('tApp')
	.controller('WorkTimelineItemController', ['WorkData','$scope','$stateParams', function (WorkData, $scope, $stateParams) {

		var id = $stateParams.itemId

		var items = WorkData.data().companies;

		$scope.item = _.find(items, function(item){ return item.id === id })

	}]);
