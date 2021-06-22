const getRandomFloat = (min, max, countDec) => {
  if (min === max) {
    return 0;
  }
  const minValue = Math.min(min, max);
  const maxValue = Math.max(min, max);
  const rangeValue = Math.random() * (maxValue - minValue) + minValue;
  return rangeValue.toFixed(countDec);
};


const getRandomInRange = (min, max) => {
  if (min === max) {
    return 0;
  }
  const minValue = Math.min(min, max);
  const maxValue = Math.max(min, max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
];

const FOTOS = [
  'https: //assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomItem = (items) => items[getRandomInRange(0, items.length - 1)];

const getRandomItems = (items) => {
  const itemCount = getRandomInRange(0, items.length - 1);
  const result = [];

  while (result.length - 1 < itemCount) {
    const randomItem = getRandomItem(items);
    if (!result.includes(randomItem)) {
      result.push(randomItem);
    }
  }
  return result;
};

const getOffer = (numAvatar) => {
  const latValue = getRandomFloat(35.65000, 35.70000, 5);
  const lngValue = getRandomFloat(139.70000, 139.80000, 5);
  let num = `0${  numAvatar}`;
  if (numAvatar >= 10) {
    num = `${  numAvatar}`;
  }
  return {
    autor: {
      avatar: `img/avatars/user${num}.png`,
    },
    offer: {
      title: 'Мое объявление',
      address: `${latValue}, ${lngValue}`,
      price: getRandomInRange(100, 1000),
      type: getRandomItem(TYPES),
      rooms: getRandomInRange(1, 10),
      guests: getRandomInRange(0, 10),
      checkIn: getRandomItem(CHECKINS),
      checkOut: getRandomItem(CHECKOUTS),
      features: getRandomItems(FEATURES),
      description: 'Описание помещения',
      photos: getRandomItems(FOTOS),
    },
    location: {
      lat: latValue,
      lng: lngValue,
    },
  };
};


const getOffers = () => {
  const offers = [];
  for (let i = 1; i <= 10; i++) {
    offers.push(getOffer(i));
  }
  return offers;
};

getOffers();
