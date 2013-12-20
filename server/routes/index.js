(function (exports) {

	"use strict";

	exports.init = function (app) {

		app.get('/', function (req, res) {

			var data = {};

			return res.format({
				html: function(){
					res.render('index.html');
				},
				json: function(){
					res.send(data);
				}
			});

		});

	};

}(exports));