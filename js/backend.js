const SERVER_URL = 'https://23.javascript.pages.academy/keksobooking';


const getSucсess = () => {
  const elem = document.querySelector('#success');
  const elemSuccess = elem.cloneNode(true);
  return elemSuccess;
};

const getError = () => {
  const elem = document.querySelector('#error');
  const elemError = elem.cloneNode(true);
  return elemError;
};

const getData = (onSuccess, onError) => {

  fetch(`${SERVER_URL}/data`, {
      method: 'GET',
      credentials: 'same-origin',
      body: new FormData(),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      onError(err);
    });
};


// const sendData = () => {
//   fetch(SERVER_URL, {
//     method: 'POST',
//     body: FormData(),
//   });

//   if (!response.ok) {
//     throw new Error(`Ошибка по адресу ${SERVER_URL}, статус ошибки ${response.status}`);
//   }

//   return response.json();
// };

const sendForm = (onSuccess) => {

  const cartForm = document.querySelector('.ad-form');

  cartForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    fetch(SERVER_URL, {
      method: 'POST',
      body: formData,
    }).then(() => {
      onSuccess();
      getSucсess();
    }).catch(() => getError());
  });
  cartForm.addEventListener('reset', (evt) => {
    evt.cartForm.reset();
  });
};




// sendData(SERVER_URL, formData)
//   .then(() => {
//     getSucсess();
//     cartForm.reset();
//   })
//   .catch(('error', () => {
//     getError();
//     throw new Error('Произошла ошибка соединения');
//   }));



export {
  getData,
  sendForm
};
