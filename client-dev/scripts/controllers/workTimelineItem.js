angular.module('tApp')
	.controller('WorkTimelineItemController', ['Companies','$scope','$stateParams', function (Companies, $scope, $stateParams) {

		var id = $stateParams.itemId

		var items = Companies.data();

		$scope.item = _.find(items, function(item){ return item.id === id })

	}]);
