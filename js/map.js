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

const points = [{
    title: 'Футура',
    lat: 59.96925,
    lng: 30.31730,
  },
  {
    title: 'Шаверма',
    lat: 59.96783,
    lng: 30.31258,
  },
  {
    title: 'Франк',
    lat: 59.95958,
    lng: 30.30228,
  },
  {
    title: 'Ginza',
    lat: 59.97292,
    lng: 30.31982,
  },
];

points.forEach(({
  lat,
  lng,
}) => {
  const icon = L.icon({
    iconImage: 'src = "img/pin.svg"',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker({
    lat,
    lng,
  }, {
    icon,
  });

  marker.addTo(map).bindPopup(points.title);
});

const mainPinIcon = L.icon({
  iconImage: 'src = img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: 59.96831,
  lng: 30.31748,
}, {
  draggable: true,
  icon: mainPinIcon,
});
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  // eslint-disable-next-line no-console
  console.log(evt.target.getLatLng());
});
mainPinMarker.remove();

export {
  map,
  mainPinIcon,
  mainPinMarker
};
