import {
  getRandomFloat,
  getRandomInRange,
  getRandomItem,
  getRandomItems
} from './utils.js';


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


const getOffer = (numAvatar) => {
  const latValue = getRandomFloat(35.65000, 35.70000, 5);
  const lngValue = getRandomFloat(139.70000, 139.80000, 5);
  let num = `0${numAvatar}`;
  if (numAvatar >= 10) {
    num = `${numAvatar}`;
  }
  return {
    author: {
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

export default getOffers;
