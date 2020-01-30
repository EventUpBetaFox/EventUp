const input = document.getElementById('location');

if (input) {
  const defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));
  const searchBox = new google.maps.places.SearchBox(input, {
    bounds: defaultBounds
  });
}