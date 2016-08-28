function recupero_indirizzo(myLatLng,tagID_ind,tagID_city)
{
	var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'latLng': myLatLng}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[1]) {
						var route = '';
						var number = '';
						var city = '';
						for (i = 0; i < results[0].address_components.length; i++) 
						{
							for (j = 0; j < results[0].address_components[i].types.length; j++) 
							{
								if (results[0].address_components[i].types[j] == "route")
									route = results[0].address_components[i].long_name;
								if (results[0].address_components[i].types[j] == "street_number")
									number = results[0].address_components[i].long_name; 
								if (results[0].address_components[i].types[j] == "administrative_area_level_3")
									city = results[0].address_components[i].long_name; 
							}
							
							if (number != '')
							{
								document.getElementById(tagID_ind).value = route + ', ' + number;
								document.getElementById(tagID_city).value = city;
							}
							else
							{
								document.getElementById(tagID_ind).value = route;
								document.getElementById(tagID_city).value = city;
							}
						
						}
				}
				else {
					alert("No results found"); }
				}
			else {
				alert("Geocoder fallito"); }
			 });
	
}
