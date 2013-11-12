angular.module('tApp')
	.controller('WorkGalleryController', ['Projects', 'Companies','$scope','$rootScope','$timeout','$stateParams','$location',
		function (Projects,Companies,$scope,$rootScope,$timeout,$stateParams,$location) {

			var
				codeTimer, DEFAULT_MAX, DEFAULT_OFFSET,
				searchFilter, pagination, params,
				allProjects, years
				;

			DEFAULT_MAX = 6;
			DEFAULT_OFFSET = 0;

			/**
			 * Populate array of available years
			 * [ { year:"2013", selected:false }, .... ]
			 */
			years = $scope.years = _.reduce(
					( _.range(2003, (new Date).getFullYear() + 1).reverse() ),
					function(memo, year){
						memo.push( { year:year, selected:false } )
						return memo
					},
					[]
				)

			// TODO merge state params into filter to allow link sharing/bookmarking

			//		params = $stateParams;
			//		$scope.max = parseInt(params.max) || 6;
			//		$scope.offset = parseInt(params.offset) || 0;
			//		$scope.company_id = params.company_id || "";

			searchFilter = $scope.searchFilter = {
				company_ids : [],
				years : [],
				tags : [],
				ttt : null // when it is necessary to trigger change
			};

			pagination = $scope.pagination = {
				max : DEFAULT_MAX,
				offset : DEFAULT_OFFSET,
				nextOffset: null,
				prevOffset: null
			}


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
				if(searchFilter.years.length){

					filteredByProperty = _.filter(filteredByProperty, function(proj){

						// check if project from/to fields value matches
						// years selected

						var fromDate, fromYear, toDate, toYear,
							yearsToCheck = [], contains = false;

						fromDate = new Date()
						toDate = new Date()

						if(proj.from){
							fromDate.setTime(proj.from)
						}
						if(proj.to){
							toDate.setTime(proj.to)
						}

						fromYear = fromDate.getFullYear();
						toYear = toDate.getFullYear();

						if(fromYear === toYear)
							yearsToCheck = [toYear];
						else
							yearsToCheck = _.range(fromYear,toYear)

						contains = _.some(searchFilter.years, function(yearValue){
							return _.contains(yearsToCheck, yearValue )
						})

						return contains
					});

				}

				// sort

				// save pagination details
				pagination.prevOffset = (pagination.offset - pagination.max) > -1 ? (pagination.offset - pagination.max) : null;
				pagination.nextOffset = (pagination.offset + pagination.max) >= filteredByProperty.length ? null : (pagination.offset + pagination.max)

				// paginate results
				filtered = filteredByProperty.slice(pagination.offset,(pagination.max + pagination.offset));

				$scope.projects = filtered;
			}



			// public methods allowing filtering
			////////////////////////////////////////////

			$scope.toggleCompany = function(companyId){

				// TODO add toggleCompany filter function
				////////////////////////////////////////////

				// RESET MAX & OFFSET
				pagination.offset = DEFAULT_OFFSET
				pagination.max = DEFAULT_MAX

			}

			$scope.toggleYear = function(y){

				// RESET MAX & OFFSET
				pagination.offset = DEFAULT_OFFSET
				pagination.max = DEFAULT_MAX

				if(y != null){
					_.each(years, function(obj, index, list){
						if(obj.year === y){

							// change state
							obj.selected = !obj.selected

							// update search filter
							if( _.indexOf(searchFilter.years, obj.year) > -1 ){
								searchFilter.years = _.difference(searchFilter.years, [obj.year])
							} else {
								searchFilter.years = _.union(searchFilter.years, [obj.year])
							}
						}
					})
				} else {
					_.each(years, function(obj, index, list){
						obj.selected = false;
					})
					searchFilter.years = [];
				}

				// TRIGGER CHANGE
				searchFilter.ttt = (new Date).getTime()
			}




			// public methods allowing pagination
			////////////////////////////////////////////

			$scope.prevPage = function(){
				if(pagination.prevOffset != null){
					pagination.offset = pagination.prevOffset

					// trigger change to filter
					searchFilter.ttt = (new Date).getTime()
				}
			}

			$scope.nextPage = function(){
				if(pagination.nextOffset != null){
					pagination.offset = pagination.nextOffset

					// trigger change to filter
					searchFilter.ttt = (new Date).getTime()
				}
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
