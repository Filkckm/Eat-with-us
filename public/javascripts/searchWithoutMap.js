function searchLocation() {
	var input = document.getElementById('locationName');
	var autocomplete = new google.maps.places.Autocomplete(input);

}
google.maps.event.addDomListener(window, 'load', searchLocation);
