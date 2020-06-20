const app = angular.module("MyApp", []);

app.controller("MyController", ['$http', function($http) {
  this.createForm = {}

  // Create New Board
  this.createBoard = () => {
    console.log(this.board);
    $http({
      method:'POST',
      url:'/boards',
      data: this.createForm
    }).then((response) => {
      this.getBoard()
    }, (error) => {
      console.log(error);
    })
  }

  // Index - Show Items on page as they are created
  this.getBoard = () => {
    $http({
      method:'GET',
      url:'/boards'
    }).then((response) => {
      this.boards = response.data
    })
  }

  this.getBoard()
}]) // END OF APP.CONTROLLER
