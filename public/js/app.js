const app = angular.module("MyApp", []);

app.controller("MyController", ['$http', function($http) {
  this.skate= 'Stay Grindin'
  this.surf = 'Epic Swells'
  this.snow = 'Shred the Gnar'

  this.createBoard = () => {
    console.log(this.board);
  //   $http({
  //     method:'POST',
  //     url:'/boards',
  //     data: {this.createForm}
  //   })
  // }
}]) // END OF APP.CONTROLLER
