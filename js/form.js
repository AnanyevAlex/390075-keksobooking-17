'use strict';
(function () {
  var VALID_GUEST_COUNT = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };
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
    return document.querySelector('.map__filters');
  };

  var getAdFieldsetEl = function () {
    return document.querySelectorAll('.ad-form__element');
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
    return document.querySelector('#timein');
  };

  var getTimeOutEl = function () {
    return document.querySelector('#timeout');
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
    return VALID_GUEST_COUNT[roomCount].some(function (item) {
      return item === guestCount;
    });
  };

  var checkSelectNumberGuestEl = function (roomValue) {
    var guestValue = Number(selectNumberGuestEl.value);
    if (isValidGuestCount(roomValue, guestValue)) {
      setCustomValidityMessage(selectNumberGuestEl, '');
    } else {
      setCustomValidityMessage(selectNumberGuestEl, MessageErrorGuest[roomValue]);
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
  };

  adFormEl.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.load.sendData(new FormData(adFormEl), window.successForm.successHandler, window.successForm.errorHandler);
    window.setActivePage.activatePage(false);
  });

  var resetFormButtonEl = adFormEl.querySelector('.ad-form__reset');
  resetFormButtonEl.disabled = false;
  var resetClickHandler = function () {

    window.setActivePage.activatePage(false);
  };
  resetFormButtonEl.addEventListener('click', resetClickHandler);

  window.form = {
    initializationMap: initializationMap,
    disableMapFilters: disableMapFilters,
    disableForm: disableForm,
  };
})();
