import {
  initForm,
  featuresFields,
  roomCapacity,
  roomNumber,
  timeIn,
  timeOut,
  priceInput,
  descriptionField,
  accomondationType,
  title
} from './form.js';


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
    })
    .catch((err) => {
      onError(err);
    });
};

const sendForm = (onSuccess, onError) => {


  cartForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

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

  const syncValues = (element, value) => {
    element.value = value;
  };

  cartForm.querySelector('.ad-form__reset').addEventListener('click', () => {
    cartForm.reset();
    initForm();
    syncValues(title, '');
    syncValues(accomondationType, 'flat');
    syncValues(priceInput, '1000');
    syncValues(timeIn, '12:00');
    syncValues(timeOut, '12:00');
    roomNumber.selectedIndex = 0;
    roomCapacity.selectedIndex = 2;
    featuresFields.forEach((elem) => {
      elem.checked = false;
    });
    syncValues(descriptionField, '');
  });
};
sendForm(onSucсessSend, onErrorSend);
export {
  getData,
  sendForm
};
