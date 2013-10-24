angular.module('tApp')
	.factory('WorkData', ['$http', function ($http) {

		var cachedData = null;

		var successFn = function(resp){

			// resp has data,status,header,config

			console.log("success")

			console.log( JSON.stringify( resp.data ) )

			cachedData = resp.data;
			return cachedData;
		};
		var errorFn = function(resp){

			console.error("error code:" + resp.status)

			return cachedData;
		};

		var json = $http.get('/work_data.json').then(successFn,errorFn);

		return {
			data: function(){
				if(cachedData != null)
					return cachedData;
				return json;
			}
		}

	}]);
