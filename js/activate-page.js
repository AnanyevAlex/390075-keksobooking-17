'use strict';
(function () {
  var ENTER_KEY_CODE = 13;
  var mapBlockEl = document.querySelector('.map');
  var adFormEl = document.querySelector('.ad-form');
  var adFormSubmitBtnEl = adFormEl.querySelector('.ad-form__submit');
  var adFormPhotoEl = adFormEl.querySelector('.ad-form__field');
  var adFormPhotoDisplayEl = adFormEl.querySelector('.ad-form-header__preview > img');
  var initialInputsEl = adFormEl.querySelectorAll('input');
  var initialSelectsEl = adFormEl.querySelectorAll('select');
  var textareaEl = adFormEl.querySelector('textarea');
  var mainMapPinEl = document.querySelector('.map__pin--main');
  var resetFormButtonEl = adFormEl.querySelector('.ad-form__reset');
  var propertyTypeEl = adFormEl.querySelector('#type');
  var prorertyPriceEl = adFormEl.querySelector('#price');
  var roomNumberEl = adFormEl.querySelector('#room_number');
  var capacityEl = adFormEl.querySelector('#capacity');
  var timeInEl = adFormEl.querySelector('#timein');
  var timeOutEl = adFormEl.querySelector('#timeout');

  var activatePage = function (isActive) {

    if (isActive) {
      // remove class .map--faded
      mapBlockEl.classList.remove('map--faded');
      window.data.loadData();

      // Activation of form
      // находится в форм инициализатион
/*      adFormEl.classList.remove('ad-form--disabled');
      adFormPhotoEl.removeAttribute('disabled');
      initialInputs.forEach(function (item) {
        item.removeAttribute('disabled');
      });
      initialSelects.forEach(function (index) {
        index.removeAttribute('disabled');
        textarea.removeAttribute('disabled');
      });*/

      window.form.initializationMap();

      // activation of buttons
      /*resetForm.disabled = false;
      adFormElSubmit.removeAttribute('disabled');*/

    } else {
     /* window.removeElement.removeCard();
      window.removeElement.removePins();*/
      window.filter.removePins();

      // return main pin to default place;
      mainMapPinEl.style.visibility = 'visible';
      mainMapPinEl.style.left = window.constants.MAIN_PIN_DEFAULT_X + 'px';
      mainMapPinEl.style.top = window.constants.MAIN_PIN_DEFAULT_Y + 'px';
      window.setAddress(window.constants.MAIN_PIN_DEFAULT_X, window.constants.MAIN_PIN_DEFAULT_Y);

      // disable the map and the form
      document.querySelector('.map').classList.add('map--faded');
      adFormEl.classList.add('ad-form--disabled');

      // disable photo and avatar and add a grey div back
      adFormElPhoto.disabled = true;
      adFormElPhotoDisplay.src = 'img/muffin-grey.svg';
      var photosDiv = adFormEl.querySelectorAll('.ad-form__photo');

      photosDiv.forEach(function (item) {
        item.remove();
      });

      var photoBack = document.createElement('div');
      photoBack.classList.add('ad-form__photo');
      var photosContainer = document.querySelector('.ad-form__photo-container');
      photosContainer.appendChild(photoBack);

      // disable and clear all text inputs and checkboxes
      initialInputs.forEach(function (item) {
        item.disabled = true;
        if (item.type !== 'checkbox') {
          item.value = null;
        } else if ((item.type === 'checkbox') && (item.checked)) {
          item.checked = false;
        }
      });

      // disable all selectors
      initialSelects.forEach(function (item) {
        item.disabled = true;
      });

      // set selectors to deafult
      propertyType.selectedIndex = '1';
      prorertyPrice.placeholder = '1000';
      roomNumber.selectedIndex = '0';
      capacity.selectedIndex = '2';
      timein.selectedIndex = '0';
      timeout.selectedIndex = '0';

      // disable and clear textarea
      textarea.disabled = true;
      textarea.value = '';

      // disable buttons
      resetForm.disabled = true;
      adFormElSubmit.disabled = true;

      window.setAddress(Math.round(mainMapPinEl.offsetLeft + window.constants.MAIN_ROUND_PIN_WIDTH / 2), Math.round(mainMapPinEl.offsetTop + window.constants.MAIN_ROUND_PIN_HEIGHT / 2));
    }

  };

/*  activatePage(false);
*/
  // set active mode!
/*  mainMapPinEl.addEventListener('mousedown', function () {
    activatePage(true);
  });*/

  var enterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      activatePage(true);
      mainMapPinEl.removeEventListener('keydown', enterPressHandler);
    }
  };
  mainMapPinEl.addEventListener('keydown', enterPressHandler);

  window.activatePage = {
    activatePage: activatePage,
  }

})();
