const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const preview = document.querySelector('.ad-form-header__preview img');
const fileChooser = document.querySelector('.ad-form__field input[type=file]');
const imgInput = document.querySelector('#avatar');


fileChooser.addEventListener('change', () => {
  imgInput.classList.remove('.visually-hidden');
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }

});


