const createForm = () => {
  const noticeForm = document.querySelector('.notice__form');
  const formFieldset = noticeForm.querySelectorAll('fieldset');
  const fileChooserAvatar = document.querySelector('#avatar');
  const noticePreview = document.querySelector('.notice__preview img');
  const title = document.querySelector('#title');
  const addressInput = document.querySelector('#address');
  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');
  const accomondationType = document.querySelector('#type');
  const priceInput = document.querySelector('#price');
  const accomondationTypes = ['bungalo', 'flat', 'house', 'palace'];
  const accomondationPrices = [0, 1000, 5000, 10000];
  const roomNumber = document.querySelector('#room_number');
  const roomCapacity = document.querySelector('#capacity');
  const descriptionField = document.querySelector('#description');
  const featuresFields = noticeForm.querySelectorAll('.features input[type=checkbox]');
  const fileChooserPhotos = document.querySelector('#images');
  const photosContainer = document.querySelector('.form__photo-container');

  //disabled полей

  const addDisabledFildset = () => {
    for (let i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = true;
    }
  };
  addDisabledFildset();

  //enabled полей

  const removeDisabledFildset = () => {
    for (let i = 0; i < formFieldset.length; i++) {
      formFieldset[i].removeAttribute('disabled');
    }
  };
  // Загрузка аватарки

  const avatarClickHandler = (result) => {
    noticePreview.src = result;
  };

  window.loadRhoto.setImage(fileChooserAvatar, avatarClickHandler);

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
    const addressString = 'x: ' + xCoord + ', ' + 'y: ' + yCoord;

    addressInput.setAttribute('value', addressString);
  };

  const syncValues = (element, value) => {
    element.value = value;
  };
  window.synchronizeFields(timeIn, timeOut, window.data.times, window.data.times, syncValues);

  const syncValueWithMin = (element, value) => {
    element.min = value;
  };
  window.synchronizeFields(accomondationType, priceInput, accomondationTypes, accomondationPrices, syncValueWithMin);
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
      }
      if (roomCapacity[i].value <= choosenValue && roomCapacity[i].value > 0) {
        roomCapacity[i].disabled = false;
      }
    }
  };

  roomNumber.addEventListener('change', roomNumberChangeHandler);

  //Загрузка фотографий

  const photoClickHandler = (result) => {
    const previewPhoto = document.createElement('img');
    previewPhoto.src = result;
    previewPhoto.style = 'max-width: 100px; max-height: 100px; margin-top: 10px';
    photosContainer.appendChild(previewPhoto);
  };

  window.loadRhoto.setImage(fileChooserPhotos, photoClickHandler);

  // Сброс на дефолт и вывод сообщения

  const onLoad = () => {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.classList.add('success-message');
    div.style = 'position: fixed; z-index: 10; width: 300px; height: 50px; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #6EBC72; color: #ffffff; text-align: center; border: 2px solid white';
    p.textContent = 'Данные отправлены успешно';
    div.appendChild(p);
    fragment.appendChild(div);
    window.map.mapSection.appendChild(fragment);
    window.setTimeout(() => {
      document.querySelector('sucess-message').style = 'display: none;';
    }, 3000);

    syncValues(title, '');
    syncValues(accomondationType, 'flat');
    syncValues(priceInput, '1000');
    syncValues(timeIn, '12:00');
    syncValues(timeOut, '12:00');
    roomNumber.selectedIndex = 0;
    roomCapacity.selectedIndex = 2;
    featuresFields.forEach((elem) => elem.checked = false);
    syncValues(descriptionField, '');
  };

  const formSubmitHandler = (evt) => {
    window.backend.upload(new FormData(noticeForm), onLoad, window.utils.onError);
    evt.preventDefault();
  };

  noticeForm.addEventListener('submit', formSubmitHandler);

  window.form = {
    removeDisabledFildset: removeDisabledFildset,
    noticeForm: noticeForm,
    setAddres: setAddres,

  };
};
export {
  createForm
};
