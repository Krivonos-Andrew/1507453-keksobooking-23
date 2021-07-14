import {
  showCard
} from './card.js';

const map = L.map('map-canvas')
  .on('load', () => {
    // eslint-disable-next-line no-console
    console.log('Карта инициализирована');
  })
  .setView({
    lat: 35.41,
    lng: 139.41,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const offersGroup = L.layerGroup().addTo(map);

const putMarkerOnMap = ((offer) => {
  const iconOffer = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const markerOffer = L.marker({
    lat: offer.location.lat,
    lng: offer.location.lng,
  }, {
    iconOffer,
  });
  markerOffer.addTo(offersGroup).bindPopup(showCard(offer), {
    keepInView: true,
  });
});


// putMarkerOnMap.forEach(({
//   lat,
//   lng,
// }) => {
//   const icon = L.icon({
//     iconImage: 'src = "img/pin.svg"',
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//   });

//   const marker = L.marker({
//     lat,
//     lng,
//   }, {
//     icon,
//   });

//   marker.addTo(map).bindPopup(points.title);
// });

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: 35.41,
  lng: 139.41,
}, {
  draggable: true,
  icon: mainPinIcon,
});
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  // eslint-disable-next-line no-console
  console.log(evt.target.getLatLng());
});


export {
  map,
  mainPinIcon,
  mainPinMarker,
  putMarkerOnMap
};
