var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';

(function (exports) {

	"use strict";

	exports.init = function (app) {

		var ses = new AWS.SES();

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

			var response = {
				sent:false
			};

			ses.listIdentities({}, function(err,data){

				response.idtt = data;
				response.idttErr = err;

				ses.sendEmail({
					Source:'info@ivarprudnikov.com',
					Destination:{
						ToAddresses:["ivar.prudnikov@gmail.com"]
					},
					Message: {
						Subject: {
							Data: req.body.subject
						},
						Body: {
							Html: {
								Data: req.body.message
							}
						}
					},
					ReplyToAddresses: [req.body.email]
				}, function(error,responseData){
					if(error == null){
						response.sent = true;
						response.successData = responseData;
					} else {
						response.error = error;
					}

					return res.format({
						html: function(){
							res.render('index.html');
						},
						json: function(){
							res.send(response);
						}
					});
				}); // end ses send


			}); // end ses list




		});

	};

}(exports));