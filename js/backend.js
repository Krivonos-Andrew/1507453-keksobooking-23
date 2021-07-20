import {
  initForm

} from './form.js';


import {
  mainPinMarker
} from './map.js';

const SERVER_URL = 'https://23.javascript.pages.academy/keksobooking';
const cartForm = document.querySelector('.ad-form');

const getSuccess = () => {
  const elem = document.querySelector('#success').content;
  const elemSuccess = elem.cloneNode(true);
  return elemSuccess;
};
const messageEscKeydownHandler = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    document.querySelector('.success', '.error').remove();
    document.removeEventListener('keydown', messageEscKeydownHandler); //  удаляем слушателя при закрытии окна по esc
  }
};

const showSuccessMessage = () => {
  //    const successWindow = getSuccess();
  document.querySelector('body').append(getSuccess()); // добавили модальное окно
  const message = document.querySelector('.success');
  document.addEventListener('keydown', messageEscKeydownHandler); // навесили слушателя esc
  message.addEventListener('click', () => { // навесили слушателя клика мыши
    message.remove(); //  удаление модального окна по клику мыши
  });

};
//очистка формы и вызов модалки успешной отправки
const onSucсessSend = () => {
  cartForm.reset();
  showSuccessMessage();
};


const getError = () => {
  const elem = document.querySelector('#error');
  const elemError = elem.cloneNode(true);
  return elemError;
};

const showErrorMessage = () => {
  //    const successWindow = getSuccess();
  document.querySelector('body').append(getError()); // добавили модальное окно
  const message = document.querySelector('.error');
  document.addEventListener('keydown', messageEscKeydownHandler); // навесили слушателя esc
  message.addEventListener('click', () => { // навесили слушателя клика мыши
    message.remove(); //  удаление модального окна по клику мыши
  });

};
const onErrorSend = () => {
  cartForm.reset();
  showErrorMessage();
};
const getData = (onSuccess, onError) => {

  fetch(`${SERVER_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((json) => {
      onSuccess(json);
      mapFilters.classList.remove('ad-form--disabled');
    })
    .catch((err) => {
      onError(err);
    });
};

const sendForm = (onSuccess, onError) => {

  cartForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    initForm();
    mainPinMarker.setLatLng({
      lat: 35.68334,
      lng: 139.78199,
    });
    const formData = new FormData(cartForm);
    fetch(SERVER_URL, {
        method: 'POST',
        body: formData,
      })
      .then((response) => {
        response.ok ? onSuccess() : onError();
      })
      //если что-то случилось ссетью
      .catch(() => onError());
  });
};


cartForm.querySelector('.ad-form__reset').addEventListener('click', () => {
  cartForm.reset();
  initForm();
  mainPinMarker.setLatLng({
    lat: 35.68334,
    lng: 139.78199,
  });
});


sendForm(onSucсessSend, onErrorSend);
export {
  getData,
  sendForm
};
