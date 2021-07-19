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

export {
  getData,
  sendForm
};
