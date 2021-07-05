import getOffers from './data.js';
import {
  showCard
} from './card.js';
import {
  removeDisabledFildset,
  setAddress
} from './form.js';
//showCard();
const offers = getOffers();
showCard(offers[0]);
removeDisabledFildset();
setAddress(20, 30);
