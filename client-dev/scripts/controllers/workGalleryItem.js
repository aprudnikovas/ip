angular.module('tApp')
	.controller('WorkGalleryItemController', ['WorkData','$scope','$stateParams', function (WorkData, $scope, $stateParams) {

		var id = $stateParams.itemId

		var items = WorkData.data().projects;

		$scope.item = _.find(items, function(item){ return item.id == id })

	}]);
