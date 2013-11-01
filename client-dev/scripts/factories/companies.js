angular.module('tApp')
	.factory('Companies', ['$http', function ($http) {

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

		var json = $http.get('/data/companies.json').then(successFn,errorFn);

		return {
			data: function(){
				if(cachedData != null)
					return cachedData;
				return json;
			}
		}

	}]);
