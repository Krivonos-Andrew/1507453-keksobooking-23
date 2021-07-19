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

const onError = (err) => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const p = document.createElement('p');
  const p1 = document.createElement('p');
  div.classList.add('error-message');
  div.style = 'position: fixed; z-index: 10; width: 200px; height: 80px; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #F4655E; color: #ffffff; text-align: center; border: 2px solid white';
  p.textContent = 'Что-то пошло не так';
  p1.textContent = err;
  div.appendChild(p);
  div.appendChild(p1);
  fragment.appendChild(div);
  window.map.mapSection.appendChild(fragment);
  setTimeout(() => {
    document.querySelector('.error-message').style = 'display: none;';
  }, 3000);
};


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
