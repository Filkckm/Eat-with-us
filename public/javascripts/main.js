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
       lat: lat,
       lng: lng
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
 //console.log(ourPosition);
 var map = new google.maps.Map(document.getElementById('map'), {
   zoom: 15,
   center: ourPosition
 });
 var myMarker = new google.maps.Marker({
   position: {
     lat: lat,
     lng: lng
   },
   map: map,
   title: "I'm here"
 });
}, 4200);
}
