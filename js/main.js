import getOffers from './data.js';
import {
  showCard
} from './card.js';
//showCard();
const offers = getOffers();
showCard(offers[0]);
import {
  createForm
} from './form.js';
createForm();
