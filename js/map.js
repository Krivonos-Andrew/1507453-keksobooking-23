import {
  getCard
} from './card.js';
import {
  getData
} from './backend.js';


const onSuccess = ((response) => {
  response.forEach((offer) => {
    putMarkerOnMap(offer);
  });
});

const onError = (err) => {};

const map = L.map('map-canvas')
  .on('load', () => {
    getData(onSuccess, onError);
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
  markerOffer.addTo(offersGroup).bindPopup(getCard(offer), {
    keepInView: true,
  });
});


const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: 35.68950,
  lng: 139.69171,
}, {
  draggable: true,
  icon: mainPinIcon,
});
mainPinMarker.addTo(map);

const addressForm = document.querySelector('#address');

mainPinMarker.on('moveend', (evt) => {
  addressForm.value = `${
    evt.target.getLatLng().lat.toFixed(5)
  }, ${
    evt.target.getLatLng().lng.toFixed(5)
  }`;
});
