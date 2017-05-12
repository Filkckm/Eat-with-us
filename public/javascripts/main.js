var ourPosition;
var markers = [];
var map;
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
     console.log(markers);
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



setTimeout(function(partys){
if (ourPosition) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ourPosition
  });
} else {
  var newCenter = {
    lat: 41.38506389999999,
    lng: 2.1734034999999494
  };
  console.log("new center:",newCenter);
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: newCenter
  });
}

 //console.log(ourPosition);


 // var myMarker = new google.maps.Marker({
 //   position: {
 //     lat: lat,
 //     lng: lng
 //   },
 //   map: map,
 //   title: "I'm here"
 // });



 function placePartys(partys){
     partys.forEach(function(party){
       var center1 = {
         lat: party.location.coordinates[1],
         lng: party.location.coordinates[0]
       };
       console.log("center1: ", center1);
       var pin = new google.maps.Marker({
         position: center1,
         map: map,
         title: party.partyName
       });
       markers.push(pin);
       console.log(markers);
     });
}
 function getParty() {
     $.ajax({
       url: "http://localhost:3000/api",
       method: 'GET',
       success: placePartys,
       error: function(error) {
         console.log('error');
       }

     });

}
getParty();
}, 4400);
}
