var app = angular.module('labz', ['ui.router']);

app.config([
	  '$stateProvider'
	, '$urlRouterProvider'
	, function($stateProvider, $urlRouterProvider){

		$stateProvider
		.state('home', {
			  url         : '/home'
			, templateUrl : '/home.html'
			, controller  : 'MainCtrl'
			// By using the resolve property in this way, 
			// we are ensuring that anytime our home state is entered, 
			// we will automatically query all posts from our backend 
			// before the state actually finishes loading.
			, resolve     : {
				postPromise : ['computers', function(computers){
					return computers.getAll();
				}]
			}
		})

		$urlRouterProvider.otherwise('home');
	}]);

app.factory('computers', ['$http', function($http){
	var o = {
		comps : []
		  // { 'ACS-CSEB240-01' : { "state" : "IN USE"
				// 			   , "os"    : "Linux"}}
		// , { "ACS-CSEB240-02" : { "state" : "OPEN"
		// 					   , "os"    : "Linux"}}
		// ]
	};

	o.getAll = function(){
		return $http.get('/computers').success(function(data){
			for (var key in data){
				var tempObj = {};
				tempObj.cName = key;
				tempObj.cState = data[key].state;
				tempObj.cOS = data[key].os;
				// console.log(tempObj);
				o.comps.push(tempObj);
			}
		});
	};

	return o;
}]);

app.controller('MainCtrl'
	, [
	    '$scope'
	  , 'computers'
	  , function($scope, computers){
	  	$scope.computers = computers.comps;
	  }
	]);