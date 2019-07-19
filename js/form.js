'use strict';
(function () {
  var VALID_GUEST_COUNT = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  }
  var adFormEl = document.querySelector('.ad-form');
  var selectRoomNumberEl = document.querySelector('#room_number');
  var selectNumberGuestEl = document.querySelector('#capacity');
  var adFormSubmitBtnEl = document.querySelector('.ad-form__submit');
  var MinPriceOfTypeOffer = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
  var MessageErrorGuest = {
    1: 'Максимальное количество гостей 1',
    2: 'Максимальное количество гостей 2',
    3: 'Максимальное количество гостей 3',
    100: 'Допустимое значение "не для гостей"',
  };

  var getMapFiltersEl = function () {
    var mapFiltersEl = document.querySelector('.map__filters');
    return mapFiltersEl;
  };

  var getAdFieldsetEl = function () {
    var adFormFieldsetEl = document.querySelectorAll('.ad-form__element');
    return adFormFieldsetEl;
  };

  var disabledEl = function (element) {
    element.setAttribute('disabled', 'disabled');
  };

  var activateEl = function (element) {
    element.removeAttribute('disabled', 'disabled');
  };

  var disableForm = function () {
    var adFormFieldsetEl = getAdFieldsetEl();

    for (var i = 0; i < adFormFieldsetEl.length; i++) {
      disabledEl(adFormFieldsetEl[i]);
    }
  };

  var disableMapFilters = function () {
    var mapFiltersEl = getMapFiltersEl();
    disabledEl(mapFiltersEl);
  };

  var activateMapFilters = function () {
    var mapFiltersEl = getMapFiltersEl();
    activateEl(mapFiltersEl);
  };

  var activateForm = function () {
    var adFormFieldsetEl = getAdFieldsetEl();

    for (var i = 0; i < adFormFieldsetEl.length; i++) {
      activateEl(adFormFieldsetEl[i]);
    }
  };

  var removeDisabledForm = function () {
    adFormEl.classList.remove('ad-form--disabled');
  };

  var addOfferTypeChangeHandler = function () {
    var offerTypeSelectEl = document.querySelector('#type');
    var inputPriceEl = document.querySelector('#price');

    offerTypeSelectEl.addEventListener('change', function () {
      inputPriceEl.placeholder = MinPriceOfTypeOffer[offerTypeSelectEl.value];
      inputPriceEl.min = MinPriceOfTypeOffer[offerTypeSelectEl.value];
    });
  };

  var getTimeInEl = function () {
    var timeInEl = document.querySelector('#timein');
    return timeInEl;
  };

  var getTimeOutEl = function () {
    var timeOutEl = document.querySelector('#timeout');
    return timeOutEl;
  };

  var addTimeChangeHandler = function (timeSelectField, relatedTimeSelectField) {
    timeSelectField.addEventListener('change', function (evt) {
      relatedTimeSelectField.value = evt.target.value;
    });
  };

  var setCustomValidityMessage = function (element, message) {
    element.setCustomValidity(message);
  };

  var isValidGuestCount = function (roomCount, guestCount) {
    return VALID_GUEST_COUNT[roomCount].some(function(item){return item === guestCount});
  }

  var checkSelectNumberGuestEl = function (roomValue) {
    var guestValue = Number(selectNumberGuestEl.value);
    console.log(isValidGuestCount(roomValue, guestValue))
    if (isValidGuestCount(roomValue, guestValue)) {
      setCustomValidityMessage(selectNumberGuestEl, '');
    } else {
      setCustomValidityMessage(selectNumberGuestEl, MessageErrorGuest[roomValue])
    }
  };

  var validateInputGuest = function () {
    checkSelectNumberGuestEl(Number(selectRoomNumberEl.value));
  };

  selectNumberGuestEl.addEventListener('change', validateInputGuest);
  adFormSubmitBtnEl.addEventListener('click', validateInputGuest);

  addTimeChangeHandler(getTimeInEl(), getTimeOutEl());
  addTimeChangeHandler(getTimeOutEl(), getTimeInEl());
  addOfferTypeChangeHandler();
  disableForm();

  var initializationMap = function () {
    removeDisabledForm();
    activateForm();
    activateMapFilters();
  }

  var errorHandler = function (errorMessage) {
    showErrorMessage(errorMessage);
  };

  adFormEl.addEventListener('submit', function (evt) {
    evt.preventDefault();
    debugger
    window.load.sendData(new FormData(adFormEl), window.successForm.successHandler, errorHandler);
  });

  var resetFormButtonEl = adFormEl.querySelector('.ad-form__reset');
    resetFormButtonEl.disabled = false;
    var resetClickHandler = function () {
      window.setActive(false);
    };
  resetFormButtonEl.addEventListener('click', resetClickHandler);

  window.form = {
    initializationMap: initializationMap,
    disableMapFilters: disableMapFilters,
  };
})();
