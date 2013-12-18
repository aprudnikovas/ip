angular.module('tApp')
	.factory('Animations', ['$timeout', function ($timeout) {

		return {

			type : {
				fade: "fade",
				left: "left",
				right: "right",
				none: "none"
			},

			options: {
				def: "",
				prog: "animate_progress",
				prep: "animate_prepare",
				typePref: "animate_type_",
				in: "animate_in",
				out: "animate_out",
				duration : {
					out: 100,
					in: 100,
					tick: 20
				}
			},

			timers: {},

			cancelTimers: function(arrOfTimers){
				if (arrOfTimers && arrOfTimers.length ){

					angular.forEach(arrOfTimers, function(timer){
						if (timer != null){
							$timeout.cancel(timer);
						}
					});
				}
			},

			animateData: function(scopeObj,options){

				var defaults,
					opt, type,
					_self = this,
					t1,t2,t3,t4
					;

				defaults = {
					data: {},
					dataVarName: "dataVarName",
					animateVar: "animationClass",
					type: "none",
					timer_cache_var: "timer_cache",
					clean: true,
					doAnimateOut: true,
					doAnimateIn: true
				};

				opt = angular.extend(defaults, _self.options, options);

				type = _self.type[opt.type] || _self.type.none;

				if ( opt.clean ){

					_self.cancelTimers(scopeObj[opt.timer_cache_var])
					scopeObj[opt.timer_cache_var] = [];

				} else if ( scopeObj[opt.timer_cache_var] == null ) {
					scopeObj[opt.timer_cache_var] = [];
				}


				if(opt.doAnimateOut == true && opt.doAnimateIn == true){
					animateOut(true);
				} else if (opt.doAnimateOut == true && opt.doAnimateIn == false){
					animateOut(true);
				} else {
					animateIn();
				}


				function animateOut(doAnimateIn){

					// start animating out
					scopeObj[opt.animateVar] = [ opt.def, opt.prog, opt.out, opt.typePref + type ].join(" ")
					t1 = $timeout(function() {

						// finished animating out
						// going into preparation
						// for next animation
						scopeObj[opt.animateVar] = [ opt.def, opt.prep, opt.out, opt.typePref + type ].join(" ");
						t2 = $timeout(function() {


							if(doAnimateIn){
								animateIn();
							} else {
								cleanup();
							}


						}, opt.duration.tick);
						scopeObj[opt.timer_cache_var].push(t2)

					}, opt.duration.out);
					scopeObj[opt.timer_cache_var].push(t1)

				}

				function animateIn(){

					// preparation in progress
					// we might move elements where we need
					// before animating in
					scopeObj[opt.animateVar] = [ opt.def, opt.prep, opt.in, opt.typePref + type ].join(" ");
					scopeObj[opt.dataVarName] = opt.data;
					t3 = $timeout(function() {

						// start animating in
						scopeObj[opt.animateVar] = [ opt.def, opt.prog, opt.in, opt.typePref + type ].join(" ");
						t4 = $timeout(function() {

							cleanup();

						}, opt.duration.in)
						scopeObj[opt.timer_cache_var].push(t4)

					}, opt.duration.tick);
					scopeObj[opt.timer_cache_var].push(t3)

				}


				function cleanup(){
					// restore default class
					scopeObj[opt.animateVar] = opt.def;

					// clean up timers
					_self.cancelTimers(scopeObj[opt.timer_cache_var])
					scopeObj[opt.timer_cache_var] = [];
				}

			} // end animateData()

		} // end return {}

	}]);
