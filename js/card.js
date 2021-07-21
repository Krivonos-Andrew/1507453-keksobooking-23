const cardListElementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const getType = (type) => {
  let resultType = '';
  switch (type) {
    case 'flat':
      resultType = 'Квартира';
      break;

    case 'palace':
      resultType = 'Дворец';
      break;

    case 'bungalow':
      resultType = 'Бунгало';
      break;

    case 'house':
      resultType = 'Дом';
      break;

  }
  return resultType;
};

const getFeatures = (items) => {

  const fragmentFeatures = document.createDocumentFragment();
  items.forEach((feature) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature', `popup__feature--${feature}`);
    fragmentFeatures.appendChild(newFeature);

  });
  return fragmentFeatures;
};

const getPhotos = (items) => {
  const fragmentPhotos = document.createDocumentFragment();
  items.forEach((photos) => {
    const newPhotos = document.createElement('img');
    newPhotos.classList.add('popup__photo');
    newPhotos.src = photos;
    newPhotos.width = '45';
    newPhotos.height = '40';
    newPhotos.alt = 'Фотография жилья';
    fragmentPhotos.appendChild(newPhotos);
  });
  return fragmentPhotos;
};

const getCard = (offer) => {
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkIn,
    checkOut,
    features,
    description,
    photos,
  } = offer.offer;

  const avatar = offer.author.avatar;

  const cardElement = cardListElementTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector('.popup__title');
  if (title) {
    cardTitle.textContent = title;
  } else {
    cardTitle.remove();
  }

  const cardAddress = cardElement.querySelector('.popup__text--address');
  if (address) {
    cardAddress.textContent = address;
  } else {
    cardAddress.remove();
  }

  const cardPrice = cardElement.querySelector('.popup__text--price');
  if (price) {
    cardPrice.textContent = `${price}  ₽/ночь`;
  } else {
    cardPrice.remove();
  }

  const cardType = cardElement.querySelector('.popup__type');


  if (type) {
    cardType.textContent = getType(type);
  } else {
    cardType.remove();
  }


  const cardCapacity = cardElement.querySelector('.popup__text--capacity');
  if (rooms, guests) {
    cardCapacity.textContent = `${rooms} комнат(ы) для ${guests} гостей`;
  } else {
    cardCapacity.remove();
  }

  const cardTime = cardElement.querySelector('.popup__text--time');
  if (checkIn, checkOut) {
    cardTime.textContent = `Заезд после ${checkIn}, выезд до ${checkOut}`;
  } else {
    cardTime.remove();
  }

  const cardFeatures = cardElement.querySelector('.popup__features');

  if (features) {
    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(getFeatures(features));
  } else {
    cardFeatures.remove();
  }
  const cardDescription = cardElement.querySelector('.popup__description');
  if (description) {
    cardDescription.textContent = description;
  } else {
    cardDescription.remove();
  }

  const cardAvatar = cardElement.querySelector('.popup__avatar');
  if (avatar) {
    cardAvatar.src = avatar;
  } else {
    cardAvatar.remove();
  }

  const cardPhotos = cardElement.querySelector('.popup__photos');

  if (photos) {
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(getPhotos(photos));
  } else {
    cardPhotos.remove();
  }
  return cardElement;
};

export {
  getCard
};
