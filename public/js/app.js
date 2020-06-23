const app = angular.module("MyApp", []);

app.controller("MyController", ['$http', function($http) {
    this.createForm = {}
    this.loggedInUser = false;
    this.boards = [];
    this.newForm = false;
    this.editForm = false;
    this.index = null;
    this.loginForm = false;
    this.signUpForm = false;
    this.showDirections = false;
    this.from = ''
    this.to = ''
    this.myAddress
      if (typeof navigator.geolocation == "undefined") {
                console.error("Your browser doesn't support the Geolocation API");
                return;
              }

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
                  timeout: 10 * 1000 // 10 seconds
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

    // Draw the map
    let mapObject = new google.maps.Map(document.getElementById("map"), myOptions);

    let directionsService = new google.maps.DirectionsService();
    let directionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    };

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



            this.calculate = function() {
              calculateRoute(this.from, this.boards[this.index].address);
              console.log(this.boards[this.index].address);
            };



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
        url:'/boards/' + board._id,
        data: this.createForm
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
        this.createForm = {}
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
