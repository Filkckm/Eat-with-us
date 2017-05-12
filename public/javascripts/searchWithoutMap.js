var ourPosition;
$(document).ready(() => {
  init();
  init1();

  google.maps.event.addDomListener(window, 'load', init);

});


  $("#search-button-my").click(function(event){
    event.preventDefault();
    const myLat = $("#lat").val();
    const myLng = $("#long").val();
    window.location.href = `/partys?lat=${myLat}&lng=${myLng}`;
  });


function init() {
  const input = document.getElementById('locationName');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert('Autocomplete’s returned place contains no geometry');
      return;
    }
    const location = {};
    // Location details
    for (let i = 0; i < place.address_components.length; i++) {
      if (place.address_components[i].types[0] === 'postal_code') {
        location.postalcode = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'country') {
        location.country = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'route') {
        location.street = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'street_number') {
        location.streetNo = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'sublocality_level_1') {
        location.neighborhood = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'administrative_area_level_2') {
        location.city = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'administrative_area_level_1') {
        location.state = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'administrative_area_level_1') {
        location.state = place.address_components[i].long_name;
      }
    }
    location.lat = place.geometry.location.lat();
    location.lng = place.geometry.location.lng();

    $("#lat").val(location.lat);
    $("#long").val(location.lng);


    console.log(location);
    console.log(location.lat);
    console.log(location.lng);
  });
}
  function init1() {
    const input = document.getElementById('locationName1');
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert('Autocomplete’s returned place contains no geometry');
        return;
      }
      const location = {};
      // Location details
      for (let i = 0; i < place.address_components.length; i++) {
        if (place.address_components[i].types[0] === 'postal_code') {
          location.postalcode = place.address_components[i].long_name;
        }
        if (place.address_components[i].types[0] === 'country') {
          location.country = place.address_components[i].long_name;
        }
        if (place.address_components[i].types[0] === 'route') {
          location.street = place.address_components[i].long_name;
        }
        if (place.address_components[i].types[0] === 'street_number') {
          location.streetNo = place.address_components[i].long_name;
        }
        if (place.address_components[i].types[0] === 'sublocality_level_1') {
          location.neighborhood = place.address_components[i].long_name;
        }
        if (place.address_components[i].types[0] === 'administrative_area_level_2') {
          location.city = place.address_components[i].long_name;
        }
        if (place.address_components[i].types[0] === 'administrative_area_level_1') {
          location.state = place.address_components[i].long_name;
        }
        if (place.address_components[i].types[0] === 'administrative_area_level_1') {
          location.state = place.address_components[i].long_name;
        }
      }
      location.lat = place.geometry.location.lat();
      location.lng = place.geometry.location.lng();

      $("#lat1").val(location.lat);
      $("#long1").val(location.lng);

      console.log(location);
    });

}
