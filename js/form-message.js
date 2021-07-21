import {
  initForm
} from './form.js';

import {
  mainPinMarker,
  putMarkerOnMap,
  map
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
    lat: 35.68334,
    lng: 139.78199,
  });
  putMarkerOnMap;
  map.closePopup();
};

const getSuccess = () => {
  const elem = document.querySelector('#success').content;
  const elemSuccess = elem.cloneNode(true);
  return elemSuccess;
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
    lat: 35.68334,
    lng: 139.78199,
  });
};

const onSucсessSend = () => {
  cartForm.reset();
  getDefault();
  showSuccessMessage();
};


const getError = () => {
  const elem = document.querySelector('#error').content;
  const elemError = elem.cloneNode(true);
  return elemError;
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
      response.ok ? onSucсessSend() : onErrorSend();
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
