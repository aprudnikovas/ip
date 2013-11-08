angular.module('tApp')
	.controller('WorkGalleryController', ['Projects', 'Companies','$scope','$rootScope','$timeout','$stateParams','$location',
		function (Projects,Companies,$scope,$rootScope,$timeout,$stateParams,$location) {

		var codeTimer, searchFilter, params, allCompanies, allProjects;

		// TODO merge state params into filter to allow link sharing/bookmarking

//		params = $stateParams;
//		$scope.max = parseInt(params.max) || 6;
//		$scope.offset = parseInt(params.offset) || 0;
//		$scope.company_id = params.company_id || "";

		searchFilter = $scope.searchFilter = {
			max : 6,
			offset : 0,
			company_ids : [],
			years : [],
			tags : []
		};


		// watch filter and update model
		////////////////////////////////////////////

		$scope.companies = Companies.getAll();
		allProjects = Projects.getAll(filterAndSortPortfolio);

		$scope.$watch( 'searchFilter', filterAndSortPortfolio, true);

		function filterAndSortPortfolio(){
			var filtered, filteredByProperty = allProjects;
			$scope.projects = []

			// filter
			if(searchFilter.company_ids.length){
				filteredByProperty = _.filter(filteredByProperty, function(proj){
					return _.contains(searchFilter.company_ids, parseInt(proj.company_id) )
				});
			}

			// sort

			// paginate
			filtered = filteredByProperty.slice(searchFilter.offset,(searchFilter.max + searchFilter.offset));

			$scope.projects = filtered;
//			$scope.prevOffset = ($scope.offset - $scope.max) > -1 ? ($scope.offset - $scope.max) : null;
//			$scope.nextOffset = ($scope.offset + $scope.max) >= filteredByProperty.length ? null : ($scope.offset + $scope.max)

		}


		// MOVING TEXT
		///////////////////
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
