/* eslint-disable */
const mapEl = document.getElementById('map');
const startLocation = JSON.parse(mapEl.dataset.startLocation);
const [startLng, startLat] = startLocation.coordinates;
const locations = JSON.parse(mapEl.dataset.locations);
const mapToken = mapEl.dataset.mapToken;

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/amphoux-s/clv117fut008r01oc79b6fvsw', // style URL
  // center: [startLng, startLat], // starting position [lng, lat]
  // zoom: 5,
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();
locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker to the map
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add pop-up
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
