const app = angular.module("MyApp", []);

app.controller("MyController", ['$http', function($http) {
let myOptions = {
zoom: 10,
center: new google.maps.LatLng(34.0522,-118.2437),
mapTypeId: google.maps.MapTypeId.ROADMAP
};
this.from
this.to

function calculateRoute(from, to){
   myOptions = {
  zoom: 10,
  center: new google.maps.LatLng(34.0522,-118.2437),
  mapTypeId: google.maps.MapTypeId.ROADMAP
  };

// Draw the map
var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);

var directionsService = new google.maps.DirectionsService();
var directionsRequest = {
  origin: from,
  destination: to,
  travelMode: google.maps.DirectionsTravelMode.DRIVING,
  unitSystem: google.maps.UnitSystem.IMPERIAL
};

directionsService.route(
  directionsRequest,
  function(response, status)
  {
    if (status == google.maps.DirectionsStatus.OK)
    {
      new google.maps.DirectionsRenderer({
        map: mapObject,
        directions: response
      });
    }
    else
      $("#error").append("Unable to retrieve your route<br />");
  }
);
}
$(() => {
if (typeof navigator.geolocation == "undefined") {
          $("#error").text("Your browser doesn't support the Geolocation API");
          return;
        }

        $("#from-link, #to-link").click(function(event) {
          event.preventDefault();
          let addressId = this.id.substring(0, this.id.indexOf("-"));
          console.log(addressId);

          navigator.geolocation.getCurrentPosition(function(position) {
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({
              "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
              if (status == google.maps.GeocoderStatus.OK)
                $("#" + addressId).val(results[0].formatted_address);
              else
                $("#error").append("Unable to retrieve your address<br />");
            });
          },
          function(positionError){
            $("#error").append("Error: " + positionError.message + "<br />");
          },
          {
            enableHighAccuracy: true,
            timeout: 10 * 1000 // 10 seconds
          });
        });

        $("#calculate-route").submit(function(event) {
          event.preventDefault();
          calculateRoute($("#from").val(), $("#to").val());
        });
      });




let lat
let long
this.map
this.url = `https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyD-O5h2pqDtNc4XLL9Obqm-hnINUM2WlLU`

this.getCurrentLocation = () => {
  if ("geolocation" in navigator) {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(
     function success(position) {
       // for when getting location is a success
        lat = position.coords.latitude;
        long = position.coords.longitude;

       console.log('latitude', lat,
                   'longitude', long);
     });
  } else {
    // geolocation is not supported
    // get your location some other way
    console.log('geolocation is not enabled on this browser')
  }

}


this.initMap = ()=> {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: long },
    zoom: 10
  });
}

this.getCurrentLocation()


}]) // END OF APP.CONTROLLER
