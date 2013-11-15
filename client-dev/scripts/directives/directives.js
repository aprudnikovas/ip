angular.module('tApp')

/**
 * Dropdown directive that gets opened and closed only through
 * clicking an opener
 * Returns <li></li> element
 */
	.directive('filterdropdown', function () {
		return {
			restrict: 'EA',
			template: '<li class="filterdropdown_root" ng-class="{filterdropdown_open:active}">'+
				'<a class="filterdropdown_link" ng-click="toggle()">{{title}} <span class="caret"></span></a>'+
				'<div class="filterdropdown_dropdown" ng-transclude></div>'+
				'</li>',
			scope: { title: '@', active:'&' },
			controller: ['$scope', '$element', '$transclude',function($scope,$element,$transclude){
				$scope.active = false;
				$scope.toggle = function(){
					$scope.active = !$scope.active;
				}
			}],
			replace: true,
			transclude: true
		};

	});
