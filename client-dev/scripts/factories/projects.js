angular.module('tApp')
	.factory('Projects', ['$resource', function ($resource) {

		return $resource('/data/projects.json', {}, {
			getAll: { method:'GET', isArray: true }
		});

//		var cachedData = null;
//
//		var errorHandler = function(resp){
//			// data,status,header,config
//			throw new Error("Something bad happened. Data:" + resp.data);
//		};
//
//		var getData = function(callback){
//			return $http.get('/data/projects.json')
//				.then(function(resp){
//					//data,status,header,config
//					return cachedData = cachedData || resp.data;
//				}, errorHandler)
//		}
//
//		return {
//			data: getData
//		}

	}]);
