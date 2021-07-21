const noticeForm = document.querySelector('.ad-form');
const formFieldset = noticeForm.querySelectorAll('fieldset');
const title = noticeForm.querySelector('#title');
const addressInput = noticeForm.querySelector('#address');
const timeIn = noticeForm.querySelector('#timein');
const timeOut = noticeForm.querySelector('#timeout');
const accomondationType = noticeForm.querySelector('#type');
const priceInput = noticeForm.querySelector('#price');
const roomNumber = noticeForm.querySelector('#room_number');
const roomCapacity = noticeForm.querySelector('#capacity');
const descriptionField = noticeForm.querySelector('#description');
const featuresFields = noticeForm.querySelectorAll('.features input[type=checkbox]');


//disabled полей

const addDisabledFildset = () => {
  formFieldset.forEach((it) => it.disabled = true);
};
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
  addressInput.setAttribute('value', '35.68334, 139.78199');
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
  const addressString = `x: ${  xCoord  },  + y: ${  yCoord}`;

  addressInput.setAttribute('value', addressString);
};

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
priceInput.addEventListener('invalid', priceInputInvalidHandler);

document.querySelector('.ad-form__element--time').onchange = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};
priceInput.addEventListener('invalid', priceInputInvalidHandler);

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
  addDisabledFildset,
  removeDisabledFildset,
  initForm,
  setAddress,
  featuresFields,
  roomCapacity,
  roomNumber,
  timeIn,
  timeOut,
  priceInput,
  descriptionField,
  accomondationType,
  title,
  addressInput

};
