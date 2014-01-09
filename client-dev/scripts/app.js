angular.module('tApp', ['ui.router','ui.bootstrap','ngResource','ui.keypress','ui.event'])
	.run(function($rootScope,$timeout) {

		$rootScope.menuIsActive = false;

		$rootScope.projectImagePath = "data/img/";

		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){

				var stateName = toState.name.replace(/\./g,'_');

				$rootScope.stateName = stateName + " animationPending ";

				$rootScope.animationStartChange = false;
				$timeout(function() {
					$rootScope.animationStartChange = true;
					$rootScope.stateName = stateName + " animationExecute ";
				}, 50);

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
				url: "/gallery",
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
					},
					"hireContent@main.hire" : {
						templateUrl: 'views/main.hire.form.html'
					}
				}
			})
			.state("main.hire.locations", {
				url: "/locations",
				views: {
					"hireContent" : {
						templateUrl: 'views/main.hire.locations.html'
					}
				}
			})
			.state("main.hire.future", {
				url: "/future",
				views: {
					"hireContent" : {
						templateUrl: 'views/main.hire.future.html'
					}
				}
			})
			.state("main.hire.documents", {
				url: "/documents",
				views: {
					"hireContent" : {
						templateUrl: 'views/main.hire.documents.html'
					}
				}
			})


  }]);
