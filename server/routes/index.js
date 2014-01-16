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

		app.post('/sendemail', function (req, res) {

			var data = {
				sent:false
			};

			console.log("****************")
			console.log(req.body)
			console.log("****************")

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