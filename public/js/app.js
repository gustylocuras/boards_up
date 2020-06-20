const app = angular.module("MyApp", []);

app.controller("MyController", ['$http', function($http) {
  this.skate= 'Stay Grindin'
  this.surf = 'Epic Swells'
  this.snow = 'Shred the Gnar'
}]) // END OF APP.CONTROLLER
