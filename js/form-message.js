import {
  initForm
} from './form.js';

import {
  mainPinMarker,
  putMarkerOnMap,
  map,
  START_ADDRESS
} from './map.js';

import {
  filterFormContainer
} from './filters.js';

const SERVER_URL = 'https://23.javascript.pages.academy/keksobooking';
const cartForm = document.querySelector('.ad-form');

const getDefault = () => {
  filterFormContainer.reset();
  initForm();
  mainPinMarker.setLatLng({
    lat: `${START_ADDRESS.lat}`,
    lng: `${START_ADDRESS.lng}`,
  });
  putMarkerOnMap;
  map.closePopup();
};

const getSuccess = () => {
  const elem = document.querySelector('#success').content;
  return elem.cloneNode(true);

};
const messageEscKeydownHandler = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    document.querySelector('.success', '.error').remove();
    document.removeEventListener('keydown', messageEscKeydownHandler);
  }
};

const showSuccessMessage = () => {
  document.querySelector('body').append(getSuccess());
  const message = document.querySelector('.success');
  document.addEventListener('keydown', messageEscKeydownHandler);
  message.addEventListener('click', () => {
    message.remove();
  });
  initForm();
  mainPinMarker.setLatLng({
    lat: `${START_ADDRESS.lat}`,
    lng: `${START_ADDRESS.lng}`,
  });
};

const onSuccesSend = () => {
  cartForm.reset();
  getDefault();
  showSuccessMessage();
};


const getError = () => {
  const elem = document.querySelector('#error').content;
  return elem.cloneNode(true);
};

const showErrorMessage = () => {

  document.querySelector('body').append(getError());
  const message = document.querySelector('.error');
  document.addEventListener('keydown', messageEscKeydownHandler);
  message.addEventListener('click', () => {
    message.remove();
  });

};
const onErrorSend = () => {
  cartForm.reset();
  showErrorMessage();
};


cartForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(cartForm);
  fetch(SERVER_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      response.ok ? onSuccesSend() : onErrorSend();
    })
    .catch(() => onErrorSend());
});


cartForm.querySelector('.ad-form__reset').addEventListener('click', () => {
  cartForm.reset();
  getDefault();
});

export {
  SERVER_URL
};
