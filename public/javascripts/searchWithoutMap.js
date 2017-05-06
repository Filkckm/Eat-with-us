
	var input = document.getElementById('locationName');
	var autocomplete = new google.maps.places.Autocomplete(input);


autocomplete.addListener('place_changed', function() {
	 var place = autocomplete.getPlace();
	 if (!place.geometry) {
	            window.alert("Autocomplete's returned place contains no geometry");
	            return;
	        }

					//Location details
				for (var i = 0; i < place.address_components.length; i++) {

						if(place.address_components[i].types[0] == 'postal_code'){
								console.log("CP: ", place.address_components[i].long_name);
						}
						if(place.address_components[i].types[0] == 'country'){
								console.log("Country: ",place.address_components[i].long_name);
						}
						if(place.address_components[i].types[0] == 'route'){
								console.log("street: ",place.address_components[i].long_name);
						}
						if(place.address_components[i].types[0] == 'street_number'){
								console.log("street number: ",place.address_components[i].long_name);
						}
				}
	//  var address = '';
	//          if (place.address_components) {
	//              address = [
	//                (place.address_components[0] && place.address_components[0].short_name || ''),
	//                (place.address_components[1] && place.address_components[1].short_name || ''),
	//                (place.address_components[2] && place.address_components[2].short_name || ''),
	// 							 (place.address_components[3] && place.address_components[3].short_name || ''),
	// 							 (place.address_components[4] && place.address_components[4].short_name || ''),
	// 							 (place.address_components[5] && place.address_components[5].short_name || ''),
	// 							 (place.address_components[6] && place.address_components[6].short_name || ''),
	// 							 (place.address_components[7] && place.address_components[7].short_name || ''),
	//              ].join(', ');
	//          }

});
