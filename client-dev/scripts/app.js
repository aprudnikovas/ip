angular.module('tApp', ['ui.router'])
	.run(function($rootScope) {
		$rootScope.menuIsActive = false;
		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
				$rootScope.stateName = toState.name.replace(/\./g,'_');
			})
	})
	.config(['$stateProvider', '$urlRouterProvider',
		function ( $stateProvider, $urlRouterProvider ) {

		$urlRouterProvider.otherwise('/main')

		$stateProvider

			.state( "main", {
				url: "/main",
				abstract: true,
				views: {
					"navigation" : {
						templateUrl: 'views/menu.html',
						controller: 'MenuController'
					},
					"footer" : {
						templateUrl: 'views/footer.html'
					}
				}
			})
			.state("main.home", {
				url: "",
				views: {
					"main@" : {
						templateUrl: 'views/main.home.html',
						controller: 'HomeController'
					}
				}
			})
			.state("main.bio", {
				url: "/bio",
				views: {
					"main@" : {
						templateUrl: 'views/main.bio.html',
						controller: 'BioController'
					}
				}
			})
			.state("main.work", {
				url: "/work",
				views: {
					"main@" : {
						templateUrl: 'views/main.work.html',
						controller: 'WorkController'
					}
				}
			})
			.state("main.work.gallery", {
				url: "/gallery?max&offset",
				views: {
					"list@main.work" : {
						templateUrl: 'views/main.work.gallery.html',
						controller: 'WorkGalleryController'
					}
				}
			})
			.state("main.work.gallery.item", {
				url: '/:itemId',
				views: {
					"list@main.work" : {
						templateUrl: 'views/main.work.gallery.list.html',
						controller: 'WorkGalleryController'
					},
					// absolutely target content view
					"item@main.work" : {
						templateUrl: "views/main.work.gallery.item.html",
						controller: 'WorkGalleryItemController'
					}
				}
			})
			.state("main.work.timeline", {
				url: "/timeline",
				views: {
					"list@main.work" : {
						templateUrl: 'views/main.work.timeline.html',
						controller: 'WorkTimelineController'
					}
				}
			})
			.state("main.work.timeline.item", {
				url: '/:itemId',
				views: {
					"list@main.work" : {
						templateUrl: 'views/main.work.timeline.list.html',
						controller: 'WorkTimelineController'
					},
					// absolutely target content view
					"item@main.work" : {
						templateUrl: "views/main.work.timeline.item.html",
						controller: 'WorkTimelineItemController'
					}
				}
			})

			.state("main.hire", {
				url: "/hire",
				views: {
					"main@" : {
						templateUrl: 'views/main.hire.html',
						controller: 'HireController'
					}
				}
			})

  }]);
