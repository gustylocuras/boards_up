// Links the app.js file to the html and allows you to insert angular into the html file directly, takes two params as arguments, the name of your app and an empty array.
const app = angular.module("MyApp", []);

//app.controller inserts all of the functionality into the webpage, is then called upon in the html file using the {{}}. $http tells the browser to render as an http page

app.controller("MyController", ['$http', function($http) {
  // createForm is initially set to an empty object and will be what we enter when create a new board item.
    this.createForm = {}
    this.loggedInUser = false;
    // this.boards is the array of boards that are being displayed on the page from the ng-repeat
    this.boards = [];
    this.newForm = false;
    this.editForm = false;
    this.index = null;
    // loginForm and signUpForm are both set to false so that the ng-show will hide the forms unless the function to show the forms is accessed.
    this.loginForm = false;
    this.signUpForm = false;
    this.showDirections = false;
    this.from = ''
    this.to = ''
    this.myAddress
    //test for browser geolocation
      if (typeof navigator.geolocation == "undefined") {
                console.error("Your browser doesn't support the Geolocation API");
                return;
              }
              //Set geocoding for user's location
                this.findLocal = () => {

                navigator.geolocation.getCurrentPosition((position) => {
                  let geocoder = new google.maps.Geocoder();
                  geocoder.geocode({
                    "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                  },
                  (results, status) => {
                    if (status == google.maps.GeocoderStatus.OK) {
                      console.log(results);
                      this.myAddress = results[0].formatted_address
                      document.getElementById("from").value = this.myAddress
                    } else {
                      console.error("Unable to retrieve your address");
                  }});
                },
                (positionError) => {
                  console.error("Error: " + positionError.message);
                },
                {
                  enableHighAccuracy: true,
                  timeout: 10000 // 10 seconds
                });
              };



    let myOptions = {
    zoom: 10,
    center: new google.maps.LatLng(34.0522,-118.2437),
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    function calculateRoute(from, to){
       myOptions = {
          zoom: 10,
          center: new google.maps.LatLng(34.0522,-118.2437),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

    // Instance map
    let mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
    //Instance Direction Service
    let directionsService = new google.maps.DirectionsService();
    //Instance Direction Request
    let directionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    };
    //Route = request + callback + renderer
    directionsService.route(
      directionsRequest,
      (response, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
          new google.maps.DirectionsRenderer({
            map: mapObject,
            directions: response
          });
        }
        else {
        console.error("Unable to retrieve your route");
          }
        }
      );
    }


            //callback to calculateRoute with data from form (geocode) and address saved on model
            this.calculate = function() {
              calculateRoute(this.from, this.boards[this.index].address);
              console.log(this.boards[this.index].address);
            };



  //signup
  // Creates a new user to the users database and assigns the values entered in the signupUsername / signupPassword to username / password. Then assings the response.data to the loggedInUser.
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

    // Toggle the Create New Spot Form
    this.toggleNewForm = () => {
      this.newForm = !this.newForm
    }

    // Toggle Login Form
    this.toggleLogin = () => {
      this.loginForm = !this.loginForm
    }

    // Toggle Sign Up Form
    this.toggleSignUp = () => {
      this.signUpForm = !this.signUpForm
    }

    // Toggle the Edit Spot form
    this.toggleEditForm = (index) => {
      this.editForm = !this.editForm
      this.index = index
    }

    // Toggle Directions and map
    this.toggleDirection = (index) => {
      this.showDirections = !this.showDirections
      this.index = index
    }


    //DELETE
    // Accesses the id value of the item and assings the delete method to that item. Then returns the getBoard function to display the remaining data to the page.
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
    // Accesses the id value of the item being edited, manipulates the DOM from the data entered into the input fields and updates the DOM with the new data entered once it is submitted. Then returns the getBoard function to display the data to the page.
    this.editBoard = (board) => {
      $http({
        method:'PUT',
        url:'/boards/' + board._id,
        data: this.createForm
      }).then((response) => {
        this.getBoard()
      }, (error) => {
        console.log(error);
      })
    }

    // Create New Board
    // use ajax to contact the server to make an HTTP request to add the item to the database. Waits for the method, url, and data to post before submitting the response back to the server. It then runs the getBaord function which displays the data onto the page and resets the form to an empty object.
    this.createBoard = () => {
      console.log(this.boards);
      $http({
        method:'POST',
        url:'/boards',
        data: this.createForm
      }).then((response) => {
        this.getBoard()
        this.createForm = {}
      }, (error) => {
        console.log(error);
      })
    }

    // Index - Show Items on page as they are created
    // Gets all of the data from the url /boards and returns the respose.data from the database.
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

    //saves user on refresh

    $http({
      method:'GET',
      url:'/session'
  }).then((response) => {
    if(response.data.username){
          this.loggedInUser = response.data;
      }
  })

}]) // END OF APP.CONTROLLER
