angular.module('tApp')
	.factory('Projects', ['$http', function ($http) {

		var cachedData = null;

		var successFn = function(resp){

			// resp has data,status,header,config

			cachedData = resp.data;
			return cachedData;
		};
		var errorFn = function(resp){

			console.error("error code:" + resp.status)

			return cachedData;
		};

		var json = $http.get('/data/projects.json').then(successFn,errorFn);

		var getData = function(){
			if(cachedData != null)
				return cachedData;
			return json;
		}

		return {
			data: getData
		}

	}]);
