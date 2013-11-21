angular.module('tApp')
	.controller('WorkGalleryItemController', ['Projects','$scope','$stateParams', function (Projects, $scope, $stateParams) {

		var id = $stateParams.itemId

		Projects.getAll(function(projects){
			$scope.item = _.find(projects, function(item){ return item.id == id })
		});

	}]);
