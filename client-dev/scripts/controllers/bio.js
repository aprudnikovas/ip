angular.module('tApp')
	.controller('BioController', ['$scope','$rootScope','$timeout', function ($scope,$rootScope,$timeout) {

		$scope.animateHeader = false;

		$timeout(function() {
			$scope.animateHeader = true;
		}, 100);


		// ala moving code
		////////////////////////

		var timer;
		$scope.codeText = '010100100110100101001001001010100101010111001010010010100000001101110010100101001010010011001010101001011001010010101010010010100101011111100100101001001101001010010101111010101010111100001010111001010100110101001010100100110100101001001001010100101010111001010010010100000001101110010100101001010010011001010101001011001010010101010010010100101011111100100101001001101001010010101111010101010111100001010111001010100110101001'
		$scope.execTimer = function(){
			timer = $timeout(function() {
				var t = $scope.codeText;
				var a = t.slice(0,t.length - 3)
				var b = t.slice(t.length - 3)
				$scope.codeText = b + a;

				$scope.execTimer()

			}, 200);
		}


		// CAROUSEL
		////////////////////////

		$scope.codeData = [
			{
				lang:'html',
				text:'HyperText Markup Language (HTML) is the main markup language for creating web pages and other information that can be displayed in a web browser.'
			},
			{
				lang:'jade',
				text:'Jade is a high performance template engine heavily influenced by Haml and implemented with JavaScript for node.'
			},
			{
				lang:'css',
				text:'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation semantics (the look and formatting) of a document written in a markup language.'
			},
			{
				lang:'less',
				text:'The dynamic stylesheet language. LESS extends CSS with dynamic behavior such as variables, mixins, operations and functions.'
			},
			{
				lang:'javascript',
				text:'JavaScript is a prototype-based scripting language with dynamic typing and has first-class functions.'
			},
			{
				lang:'node.js',
				text:"Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications."
			},
			{
				lang:'backbone',
				text:'Backbone supplies structure to JavaScript-heavy applications.'
			},
			{
				lang:'angular',
				text:'AngularJS is what HTML would have been, had it been designed for building web-apps.'
			},

			{
				lang:'groovy',
				text:'Groovy is an object-oriented programming language for the Java platform. It is a dynamic language with features similar to those of Python, Ruby, Perl, and Smalltalk.'
			},
			{
				lang:'grails',
				text:'Grails is an open source web application framework that uses the Groovy programming language.'
			},
			{
				lang:'java',
				text:'Java is a general-purpose, concurrent, class-based, object-oriented computer programming language that is specifically designed to have as few implementation dependencies as possible.'
			},
			{
				lang:'mysql',
				text:"the world's most widely used[5][6] open-source relational database management system (RDBMS)"
			},
			{
				lang:'hibernate',
				text:'Object-relational mapping (ORM) library for the Java language, providing a framework for mapping an object-oriented domain model to a traditional relational database.'
			},
			{
				lang:'mongodb',
				text:'MongoDB (from "humongous") is a cross-platform document-oriented database system.'
			}
		];

		$scope.codeIdx = 0;
		$scope.languageBlock = $scope.codeData[$scope.codeIdx]

		var codeTimer;
		$scope.execCodeTimer = function(t){
			var interval = t != null ? t : 3000
			codeTimer = $timeout(function() {
				var arr = $scope.codeData;
				var currIdx = $scope.codeIdx;
				if(currIdx < (arr.length - 1))
					$scope.codeIdx++
				else
					$scope.codeIdx = 0

				$scope.languageBlock = $scope.codeData[$scope.codeIdx]
				$scope.execCodeTimer();
			}, interval);
		}


		$scope.updateLanguageBlock = function(idx){

			if (codeTimer) {
				$timeout.cancel(codeTimer);
			}
			$scope.languageBlock = $scope.codeData[idx];
		}


		// EXECUTE TIMERS
		////////////////////////

		$scope.execTimer();
		$scope.execCodeTimer();



		// CLEANUP ON DESTROY
		///////////////////////

		$scope.$on("$destroy", function() {
			if (timer) {
				$timeout.cancel(timer);
			}
			if (codeTimer) {
				$timeout.cancel(codeTimer);
			}
			if(ageOnScreenTimer) {
				$timeout.cancel(ageOnScreenTimer);
			}
		});



	}]);
