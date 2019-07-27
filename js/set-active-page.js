'use strict';
(function () {
  var ENTER_KEY_CODE = 13;
  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;
  var MAP_MAIN_PIN_WIDTH = 65;
  var MAP_MAIN_PIN_HEIGHT = 81;
  var mapBlockEl = document.querySelector('.map');
  var adFormEl = document.querySelector('.ad-form');
  var adFormPhotoEl = adFormEl.querySelector('.ad-form__field');
  var adFormPhotoDisplayEl = adFormEl.querySelector('.ad-form-header__preview > img');
  var initialInputsEl = adFormEl.querySelectorAll('input');
  var initialSelectsEl = adFormEl.querySelectorAll('select');
  var textareaEl = adFormEl.querySelector('textarea');
  var mainMapPinEl = document.querySelector('.map__pin--main');
  var offerTypeSelectEl = adFormEl.querySelector('#type');
  var inputPriceEl = adFormEl.querySelector('#price');
  var roomNumberEl = adFormEl.querySelector('#room_number');
  var capacityEl = adFormEl.querySelector('#capacity');
  var timeInEl = adFormEl.querySelector('#timein');
  var timeOutEl = adFormEl.querySelector('#timeout');
  var addressInputEl = adFormEl.querySelector('#address');

  var activatePage = function (isActive) {

    if (isActive) {
      mapBlockEl.classList.remove('map--faded');
      window.data.loadData();
      window.form.initializationMap();

      adFormPhotoEl.removeAttribute('disabled');
      initialInputsEl.forEach(function (item) {
        item.removeAttribute('disabled');
      });
      initialSelectsEl.forEach(function (index) {
        index.removeAttribute('disabled');
      });

    } else {
      window.card.removeCardBlock();
      window.filter.removePins();

      mainMapPinEl.style.left = MAIN_PIN_DEFAULT_X + 'px';
      mainMapPinEl.style.top = MAIN_PIN_DEFAULT_Y + 'px';

      mapBlockEl.classList.add('map--faded');
      adFormEl.classList.add('ad-form--disabled');

      adFormPhotoEl.disabled = true;
      adFormPhotoDisplayEl.src = 'img/muffin-grey.svg';
      var photosDivEl = adFormEl.querySelectorAll('.ad-form__photo');

      photosDivEl.forEach(function (item) {
        item.remove();
      });

      var photoBack = document.createElement('div');
      photoBack.classList.add('ad-form__photo');
      var photosContainerEl = document.querySelector('.ad-form__photo-container');
      photosContainerEl.appendChild(photoBack);

      initialInputsEl.forEach(function (item) {
        item.disabled = true;
        if (item.type !== 'checkbox') {
          item.value = null;
        } else if ((item.type === 'checkbox') && (item.checked)) {
          item.checked = false;
        }
      });

      initialSelectsEl.forEach(function (item) {
        item.disabled = true;
      });

      offerTypeSelectEl.selectedIndex = '0';
      inputPriceEl.placeholder = '5000';
      roomNumberEl.selectedIndex = '0';
      capacityEl.selectedIndex = '0';
      timeInEl.selectedIndex = '0';
      timeOutEl.selectedIndex = '0';

      textareaEl.disabled = true;
      textareaEl.value = '';

      addressInputEl.value = Math.floor((MAIN_PIN_DEFAULT_X + MAP_MAIN_PIN_WIDTH / 2)) + ', ' + Math.floor((MAIN_PIN_DEFAULT_Y + MAP_MAIN_PIN_HEIGHT));
      addressInputEl.readOnly = true;
    }

  };

  var enterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      activatePage(true);
      mainMapPinEl.removeEventListener('keydown', enterPressHandler);
    }
  };
  mainMapPinEl.addEventListener('keydown', enterPressHandler);

  window.setActivePage = {
    activatePage: activatePage,
  };
})();
