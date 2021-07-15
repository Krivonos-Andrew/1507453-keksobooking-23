const SERVER_URL = 'https://23.javascript.pages.academy/keksobooking';
const TIMEOUT_TIME = 10000;

const getData = async (url) => {

  const response = await fetch(SERVER_URL);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
  }

  return await response.json();

};

const sendData = async (url, data) => {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
  }

  return await response.json();
};

const sendForm = () => {

  const cartForm = document.querySelector('.notice');

  cartForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  cartForm.addEventListener('reset', (e) => {
    e.cartForm.reset();
  });
  const formData = new FormData(cartForm);

  sendData(SERVER_URL, formData)
    .then(() => {
      cartForm.reset();
    })
    .then('error', (timeout) => {
      if (timeout === TIMEOUT_TIME) {
        throw new Error(`Запрос не успел выполниться за ${timeout} мс`);
      }
    })
    .catch(('error', () => {
      throw new Error('Произошла ошибка соединения');
    }));
};


export {
  getData,
  sendForm
};