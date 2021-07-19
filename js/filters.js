const filters = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: [],
};
const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = Array.from(document.querySelectorAll('#housing-features input'));
const priceParams = {
  LOW: 10000,
  HIGH: 50000,
};

const filteredByPrice = (data) => {
  switch (housingPrice.value) {
    case 'low':
      return data.offer.price < priceParams.LOW;
    case 'middle':
      return data.offer.price >= priceParams.LOW && data.offer.price <= priceParams.HIGH;
    case 'high':
      return data.offer.price > priceParams.HIGH;
  }
  return false;
};

const filteredByFeatures = (data) => {
  for (let i = 0; i < filters.features.length; i++) {
    if (data.offer.features.indexOf(filters.features[i]) === -1) {
      return false;
    }
  }
  return true;
};

const filterData = (data) => ((housingType.value === 'any') ? true : (data.offer.type === housingType.value)) &&
  ((housingPrice.value === 'any') ? true : filteredByPrice(data)) &&
  ((housingRooms.value === 'any') ? true : (data.offer.rooms === parseInt(housingRooms.value, 10))) &&
  ((housingGuests.value === 'any') ? true : (data.offer.guests === parseInt(housingGuests.value, 10))) &&
  filteredByFeatures(data);

const getFilteredData = (data) => {
  const newData = data.filter(filterData);

  return newData.slice(0, data.pinLimits);
};


const filtersChangeHandlers = () => {
  const card = document.querySelector('.map__card');
  if (map.mapSection.contains(card)) {
    card.classList.add('hidden');
  }

  for (let j = 0; j < window.mapPin.length; j++) {
    if (!mapPin[j].classList.contains('map__pin--main')) {
      window.mapPins.removeChild(mapPin[j]);
    }
  }

  const filterDataObject = getFilteredData(offersObject);
  debounce(pin.getPinsFragment(filterDataObject));
};

const housingTypeChangeHandler = (evt) => {
  filters.type = evt.target.value;

  filtersChangeHandlers();
};

const housingPriceChangeHandler = (evt) => {
  filters.price = evt.target.value;

  filtersChangeHandlers();
};

const housingRoomsChangeHandler = (evt) => {
  filters.rooms = evt.target.value;

  filtersChangeHandlers();
};

const housingGuestsChangeHandler = (evt) => {
  filters.rooms = evt.target.value;

  filtersChangeHandlers();
};

const selectFeatures = () => {
  const accum = [];
  housingFeatures.map((item) => {
    if (item.checked === true) {
      accum.push(item.value);
    }
  });
  return accum;
};

housingFeatures.forEach((item) => {
  item.addEventListener('change', () => {
    filters.features = selectFeatures();
    filtersChangeHandlers();
  });
});


housingType.addEventListener('change', housingTypeChangeHandler);
housingPrice.addEventListener('change', housingPriceChangeHandler);
housingRooms.addEventListener('change', housingRoomsChangeHandler);
housingGuests.addEventListener('change', housingGuestsChangeHandler);
