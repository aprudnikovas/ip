angular.module('tApp')
	.factory('Companies', ['$http', function ($http) {

		var cachedData = null;

		var errorHandler = function(resp){
			// data,status,header,config
			throw new Error("Something bad happened. Data:" + resp.data);
		};

		var getData = function(callback){
			return $http.get('/data/companies.json')
				.then(function(resp){
					//data,status,header,config
					return cachedData = cachedData || resp.data;
				}, errorHandler)
		}

		return {
			data: getData
		}

	}]);
