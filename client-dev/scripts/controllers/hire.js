angular.module('tApp')
	.controller('HireController', ['$scope','$rootScope','$timeout','$http', function ($scope,$rootScope,$timeout,$http) {

		$scope.codeText = '010100100110100101001001001010100101010111001010010010100000001101110010100101001010010011001010101001011001010010101010010010100101011111100100101001001101001010010101111010101010111100001010111001010100110101001010100100110100101001001001010100101010111001010010010100000001101110010100101001010010011001010101001011001010010101010010010100101011111100100101001001101001010010101111010101010111100001010111001010100110101001'

		var timer;
		$scope.visitor = {
			email: '',
			subject: '',
			message: '',
			enquiry: '',
			organizationType: ''
		};

		$scope.formIsSent = false;
		$scope.submittingData = false;

		$scope.project_types = [
			{ id:1, active:true, name:'Open source'},
			{ id:2, active:true, name:'Private B2B'},
			{ id:3, active:true, name:'Private B2C'},
			{ id:4, active:true, name:'Other'}
		];

		$scope.person_represents = [
			{ id:1, active:true, name:'HR agency'},
			{ id:2, active:true, name:'Private company'},
			{ id:3, active:true, name:'Project'},
			{ id:4, active:true, name:'Other'}
		]

		$scope.enquiry_types = [
			{ id:1, active:true, name:'Contract role'},
			{ id:2, active:false, name:'Permanent role'},
			{ id:3, active:true, name:'Help required for existing project'},
			{ id:4, active:true, name:'I have an idea'},
			{ id:5, active:true, name:'Join our startup'},
			{ id:6, active:true, name:'Other'}
		];

		$scope.sendEmail = function(){

			var visitorClone = _.clone($scope.visitor)
			var errors = validateVisitor(visitorClone);

			if(errors != null){
				$scope.formErrors = errors;
				return false;
			}

			$scope.submittingData = true;

			$http.post("/sendemail", buildPostData(visitorClone) )
				.success(function(data, status, headers, config) {
					if(status == 200 && data && data.sent === "true")
						$scope.formIsSent = true;
					else
						$scope.formErrors = ["Could not send email, try again later."]

					$scope.submittingData = false;
				}).error(function(data, status, headers, config) {
					$scope.formErrors = ["Server Error. Could not send email, try again later."];
					$scope.submittingData = false;
				});

		};

		/**
		 * Should almost always pass validation as Angular validated
		 * model already, but who knows..
		 * @param visitorObj
		 * @returns {Array}
		 */
		function validateVisitor(visitorObj){
			var errors = [];

			if(window._csrf == null)
				errors.push("Your session expired, you need to reload page to be able to submit this form.")
			if(!visitorObj.email)
				errors.push("Email is required");
			if(!visitorObj.subject)
				errors.push("Subject is required");
			if(!visitorObj.message)
				errors.push("Message is required");
			if(!visitorObj.enquiry || !visitorObj.enquiry.name)
				errors.push("Enquiry type must be selected");
			if(!visitorObj.organization_type || !visitorObj.organization_type.name)
				errors.push("Organization type must be selected");

			return errors.length ? errors : null;
		};

		function buildPostData(visitorObj){
			var o1,o2;
			o1 = _.extend( {_csrf:window._csrf}, visitorObj);
			o2 = _.pick( o1, ['_csrf', 'email', 'subject']);
			o2.message = [ o1.enquiry.name, o1.organization_type.name, o1.message].join("\n");
			return o2;
		}


		$scope.execTimer = function(){
			timer = $timeout(function() {
				var t = $scope.codeText;
				var a = t.slice(0,t.length - 3)
				var b = t.slice(t.length - 3)
				$scope.codeText = b + a;

				$scope.execTimer()

			}, 200);
		}

		$scope.execTimer()

		$scope.$on("$destroy", function() {
			if (stop) {
				$timeout.cancel(timer);
			}
		});

	}]);
