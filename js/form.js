const noticeForm = document.querySelector('.ad-form');
const formFieldset = noticeForm.querySelectorAll('fieldset');
const fileChooserAvatar = noticeForm.querySelector('#avatar');
const noticePreview = noticeForm.querySelector('.notice__preview img');
const title = noticeForm.querySelector('#title');
const addressInput = noticeForm.querySelector('#address');
const timeIn = noticeForm.querySelector('#timein');
const timeOut = noticeForm.querySelector('#timeout');
const accomondationType = noticeForm.querySelector('#type');
const priceInput = noticeForm.querySelector('#price');
const accomondationTypes = ['bungalo', 'flat', 'house', 'palace'];
const accomondationPrices = [0, 1000, 5000, 10000];
const roomNumber = noticeForm.querySelector('#room_number');
const roomCapacity = noticeForm.querySelector('#capacity');
const descriptionField = noticeForm.querySelector('#description');
const featuresFields = noticeForm.querySelectorAll('.features input[type=checkbox]');
const fileChooserPhotos = noticeForm.querySelector('#images');
const photosContainer = noticeForm.querySelector('.form__photo-container');

//disabled полей

const addDisabledFildset = () => {
  formFieldset.forEach((it) => it.disabled = true);
};

addDisabledFildset();

//enabled полей

const removeDisabledFildset = () => {

  formFieldset.forEach((it) => it.disabled = false);
};

const initForm = () => {
  priceInput.min = 1000;
  priceInput.placeholder = +priceInput.min;
  roomCapacity.value = 1;
  roomCapacity[0].disabled = true;
  roomCapacity[1].disabled = true;
  roomCapacity[3].disabled = true;
};
initForm();

const titleInvalidHandler = () => {
  if (title.validity.tooShort) {
    title.setAttribute('style', 'border-color: red');
  } else if (title.validity.tooLong) {
    title.setAttribute('style', 'border-color: red');
  } else if (title.validity.valueMissing) {
    title.setAttribute('style', 'border-color: red');
  } else {
    title.setCustomValidity('');
    title.removeAttribute('style');
  }
};
title.addEventListener('invalid', titleInvalidHandler);

//Валидность заголовка объявления

const priceInputInvalidHandler = () => {
  if (priceInput.validity.rangeUnderflow) {
    priceInput.setAttribute('style', 'border-color: red');
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setAttribute('style', 'border-color: red');
  } else if (priceInput.validity.typeMismatch) {
    priceInput.setAttribute('style', 'border-color: red');
  } else {
    priceInput.removeAttribute('style');
  }
};

const setAddress = (xCoord, yCoord) => {
  // eslint-disable-next-line no-useless-concat
  const addressString = `x: ${  xCoord  }, ` + `y: ${  yCoord}`;

  addressInput.setAttribute('value', addressString);
};
//const priceInputHandler = () => {
//    if (accomondationType.value === 'bungalow') {
//       priceInput.min = 0;
//       priceInput.placeholder = "0";
//    }
//    if (accomondationType.value === 'flat') {
//       priceInput.min = 1000;
//       priceInput.placeholder = "1000";
//    }
//     if (accomondationType.value === 'hotel') {
//       priceInput.min = 3000;
//       priceInput.placeholder = "3000";
//    }
//}
const housePrice = {
  flat: 1000,
  hotel: 3000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};
const priceInputHandler = () => {
  priceInput.min = housePrice[accomondationType.value];
  priceInput.placeholder = +priceInput.min;
};

accomondationType.addEventListener('change', priceInputHandler);
//priceInput.addEventListener('invalid', priceInputInvalidHandler);

// Деактивация селектов

const disableRoomSelect = () => {
  for (let i = 0; i < roomCapacity.length; i++) {
    roomCapacity[i].disabled = true;
  }
};
// Сравнение количества комнат и людей

const roomNumberChangeHandler = (evt) => {
  disableRoomSelect();
  const choosenValue = (evt.target.value === '100') ? '0' : evt.target.value;
  for (let i = 0; i < roomCapacity.length; i++) {
    if (roomCapacity[i].value === choosenValue) {
      roomCapacity[i].disabled = false;
      roomCapacity.value = roomCapacity[i].value;
    }
    if (roomCapacity[i].value <= choosenValue && roomCapacity[i].value > 0) {
      roomCapacity[i].disabled = false;
      roomCapacity.value = roomCapacity[i].value;
    }
  }
};

roomNumber.addEventListener('change', roomNumberChangeHandler);


export {
  removeDisabledFildset,
  noticeForm,
  setAddress
};
