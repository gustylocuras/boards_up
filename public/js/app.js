const app = angular.module("MyApp", []);

app.controller("MyController", ['$http', function($http) {
  this.createForm = {}
  this.loggedInUser = false;
  this.boards = [];

//signup
  this.signup = function(){
      $http({
        method:'POST',
        url:'/users',
        data:{
          username: this.signupUsername,
          password: this.signupPassword
        }
      }).then((response) => {
        console.log(response.data);
        this.loggedInUser = response.data
      }, (error) => {
        console.log(error);
      })

    }

//login
    this.login = function(){
      $http({
        url:'/session',
        method:'POST',
        data: {
          username: this.loginUsername,
          password: this.loginPassword
        }
      }).then((response) => {
        if(response.data.username){
          this.loggedInUser = response.data
          this.getBoard()
        } else {
          this.loginUsername = null
          this.loginPassword = null
        }
      })
    }

    //logout
    this.logout = function(){
    $http({
        url:'/session',
        method:'DELETE'
    }).then((response) => {
        this.loggedInUser = false;
    })
  }

  //DELETE
  this.deleteBoard = (board) => {
    $http({
      method:'DELETE',
      url:'/boards/' + board._id
    }).then((response) => {
      this.getBoard()
    }, (error) => {
      console.log(error);
    })
  }

  //EDIT - PUT
  this.editBoard = (board) => {
    $http({
      method:'PUT',
      url:'/boards/' + board._id
    }).then((response) => {
      this.getBoard()
    }, (error) => {
      console.log(error);
    })
  }

  // Create New Board
  this.createBoard = () => {
    console.log(this.boards);
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
      console.log(response.data);
      this.boards = response.data
    })
  }

  this.getBoard()
}]) // END OF APP.CONTROLLER
