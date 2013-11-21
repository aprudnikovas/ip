angular.module('tApp')
	.controller('WorkGalleryController', ['Projects', 'Companies','Skills','Languages','$scope','$rootScope','$timeout',
		function (Projects,Companies,Skills,Languages,$scope,$rootScope,$timeout) {

			var
				codeTimer, DEFAULT_MAX, DEFAULT_OFFSET,
				searchFilter, pagination,
				allProjects, allCompanies, allSkills, allLanguages, years,
				rootSearch
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

			/**
			 * Main search, observable search object
			 * @type {{company_ids: Array, years: Array, skill_ids: Array, language_ids: Array, ttt: null}}
			 */
			searchFilter = $scope.searchFilter = {
				company_ids : [],
				years : [],
				skill_ids : [],
				language_ids : [],
				ttt : null // when it is necessary to trigger change
			};

			/**
			 * Pagination observable object
			 * @type {{max: number, offset: number, nextOffset: null, prevOffset: null}}
			 */
			pagination = $scope.pagination = {
				max : DEFAULT_MAX,
				offset : DEFAULT_OFFSET,
				nextOffset: null,
				prevOffset: null
			}

			/**
			 * Save search params for reuse when coming back
			 * from single project view
			 */
			function updateLocationSearch(){
				var updatedSearchObject = _.extend( _.omit(searchFilter, 'ttt'), _.omit(pagination, ["nextOffset","prevOffset"]), {} );
				$rootScope.gallerySearch = updatedSearchObject;
			}

			/**
			 * check if search options exist in
			 * $rootScope.gallerySearch and merge
			 * into search filters if true
			 */
			rootSearch = $rootScope.gallerySearch;
			if( _.isObject(rootSearch) && _.size(rootSearch)){

				_.each( _.keys(pagination), function(k){
					if(rootSearch[k])
						pagination[k] = rootSearch[k];
				});

				_.each( _.keys(searchFilter), function(k){
					if(rootSearch[k])
						searchFilter[k] = rootSearch[k];
				});
			}

			// watch filter and update model
			////////////////////////////////////////////

			allCompanies = $scope.companies = Companies.getAll();
			allSkills = $scope.skills = Skills.getAll();
			allLanguages = $scope.languages = Languages.getAll();
			allProjects = Projects.getAll(filterAndSortPortfolio);

			$scope.$watch( 'searchFilter', filterAndSortPortfolio, true);

			function filterAndSortPortfolio(){
				var filtered, filteredByProperty = allProjects;
				$scope.projects = []

				// filter
				if(searchFilter.company_ids.length){
					filteredByProperty = _.filter(filteredByProperty, function(proj){
						return _.contains(searchFilter.company_ids, proj.company_id )
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

				if(searchFilter.skill_ids.length){
					filteredByProperty = _.filter(filteredByProperty, function(proj){
						return _.some(searchFilter.skill_ids, function(filterSkillId){
							return _.contains(proj.skills, filterSkillId )
						})
					});
				}

				if(searchFilter.language_ids.length){
					filteredByProperty = _.filter(filteredByProperty, function(proj){
						return _.some(searchFilter.language_ids, function(filterLanguageId){
							return _.contains(proj.languages, filterLanguageId )
						})
					});
				}

				// sort

				// save pagination details
				pagination.prevOffset = (pagination.offset - pagination.max) > -1 ? (pagination.offset - pagination.max) : null;
				pagination.nextOffset = (pagination.offset + pagination.max) >= filteredByProperty.length ? null : (pagination.offset + pagination.max)

				// paginate results
				filtered = filteredByProperty.slice(pagination.offset,(pagination.max + pagination.offset));

				// save preferences
				updateLocationSearch();

				$scope.projects = filtered;
			}



			// public methods allowing filtering
			////////////////////////////////////////////

			$scope.toggleCompany = function(companyId){

				// RESET MAX & OFFSET
				pagination.offset = DEFAULT_OFFSET
				pagination.max = DEFAULT_MAX

				if(companyId != null){
					_.each(allCompanies, function(obj, index, list){
						if(obj.id === companyId){

							// change state
							obj.selected = !(!!obj.selected)

							// update search filter
							if( _.indexOf(searchFilter.company_ids, obj.id) > -1 ){
								searchFilter.company_ids = _.difference(searchFilter.company_ids, [obj.id])
							} else {
								searchFilter.company_ids = _.union(searchFilter.company_ids, [obj.id])
							}

						}
					})
				} else {
					_.each(allCompanies, function(obj, index, list){
						obj.selected = false;
					})
					searchFilter.company_ids = [];
				}

				// TRIGGER CHANGE
				searchFilter.ttt = (new Date).getTime()

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

			$scope.toggleSkill = function(id){

				// RESET MAX & OFFSET
				pagination.offset = DEFAULT_OFFSET
				pagination.max = DEFAULT_MAX

				if(id != null){
					_.each(allSkills, function(obj, index, list){
						if(obj.id === id){

							// change state
							obj.selected = !(!!obj.selected)

							// update search filter
							if( _.indexOf(searchFilter.skill_ids, obj.id) > -1 ){
								searchFilter.skill_ids = _.difference(searchFilter.skill_ids, [obj.id])
							} else {
								searchFilter.skill_ids = _.union(searchFilter.skill_ids, [obj.id])
							}

						}
					})
				} else {
					_.each(allSkills, function(obj, index, list){
						obj.selected = false;
					})
					searchFilter.skill_ids = [];
				}

				// TRIGGER CHANGE
				searchFilter.ttt = (new Date).getTime()

			}

			$scope.toggleLanguage = function(id){

				// RESET MAX & OFFSET
				pagination.offset = DEFAULT_OFFSET
				pagination.max = DEFAULT_MAX

				if(id != null){
					_.each(allLanguages, function(obj, index, list){
						if(obj.id === id){

							// change state
							obj.selected = !(!!obj.selected)

							// update search filter
							if( _.indexOf(searchFilter.language_ids, obj.id) > -1 ){
								searchFilter.language_ids = _.difference(searchFilter.language_ids, [obj.id])
							} else {
								searchFilter.language_ids = _.union(searchFilter.language_ids, [obj.id])
							}

						}
					})
				} else {
					_.each(allLanguages, function(obj, index, list){
						obj.selected = false;
					})
					searchFilter.language_ids = [];
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
