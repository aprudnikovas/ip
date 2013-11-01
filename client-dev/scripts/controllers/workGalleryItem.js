angular.module('tApp')
	.controller('WorkGalleryItemController', ['Projects','$scope','$stateParams', function (Projects, $scope, $stateParams) {

		var id = $stateParams.itemId

		var items = Projects.data();

		$scope.item = _.find(items, function(item){ return item.id == id })

	}]);
