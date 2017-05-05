  var ourPosition;
$(document).ready(function(){

  startMap();
});

function startMap() {
  if (navigator.geolocation) {

    // Get current position
    // The permissions dialog will popup
    navigator.geolocation.getCurrentPosition(function (position) {
      // Create an object to match
      // google's Lat-Lng object format
        ourPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log('center: ', ourPosition);
      // User granted permission
      // Center the map in the position we got
    }, function () {
      // If something else goes wrong
      console.log('Error in the geolocation service.');
    });
  } else {
    // Browser says: Nah! I do not support this.
    console.log('Browser does not support geolocation.');
  }

setTimeout(function(){
  console.log(ourPosition);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: ourPosition
  });
}, 4000)



}
