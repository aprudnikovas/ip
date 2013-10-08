angular.module('tApp', ['ui.router'])
	.run(function($rootScope) {
		$rootScope.menuIsActive = false;
		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
				console.log("toState:" + toState.name + ", fromState:" + fromState.name)

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
					},
					"list@main.work" : {
						templateUrl: 'views/main.work.gallery.html',
						controller: 'WorkController'
					}
				}
			})
			.state("main.work.item", {
				url: '/:itemId',
				views: {
					"list@main.work" : {
						templateUrl: 'views/main.work.list.html',
						controller: 'WorkController'
					},
					// absolutely target content view
					"item@main.work" : {
						templateUrl: "views/main.work.item.html",
						controller: 'WorkItemController'
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
