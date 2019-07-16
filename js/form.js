'use strict';
(function () {
  var MIN_PRICE_OF_TYPE_OFFER = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
  var adFormEl = document.querySelector('.ad-form');
  var selectRoomNumberEl = document.querySelector('#room_number');
  var selectNumberGuestEl = document.querySelector('#capacity');
  var adFormSubmitBtn = document.querySelector('.ad-form__submit');

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

  var disableForm = function () {
    var adFormFieldsetEl = getAdFieldsetEl();

    for (var i = 0; i < adFormFieldsetEl.length; i++) {
      adFormFieldsetEl[i].setAttribute('disabled', 'disabled');
    }
  };

  var disableMapFilters = function () {
    var mapFiltersEl = getMapFiltersEl();
    mapFiltersEl.setAttribute('disabled', 'disabled');
  };

  var activateMapFilters = function () {
    var mapFiltersEl = getMapFiltersEl();
    mapFiltersEl.removeAttribute('disabled', 'disabled');
  };

  var activateForm = function () {
    var adFormFieldsetEl = getAdFieldsetEl();

    for (var i = 0; i < adFormFieldsetEl.length; i++) {
      adFormFieldsetEl[i].removeAttribute('disabled', 'disabled');
    }
  };


  var removeDisabledForm = function () {

    adFormEl.classList.remove('ad-form--disabled');
  };

  var addOfferTypeChangeHandler = function () {
    var offerTypeSelectEl = document.querySelector('#type');
    var inputPriceEl = document.querySelector('#price');

    offerTypeSelectEl.addEventListener('change', function () {
      inputPriceEl.placeholder = MIN_PRICE_OF_TYPE_OFFER[offerTypeSelectEl.value];
      inputPriceEl.min = MIN_PRICE_OF_TYPE_OFFER[offerTypeSelectEl.value];
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

  var messageOfGuestNumbers = function (roomsValue) {
    var message = MessageErrorGuest[roomsValue];
    return message;
  };

  var getErrorInputGuest = function (num) {
    selectNumberGuestEl.setCustomValidity(messageOfGuestNumbers(num));
  };

  var getValidatedInputGuest = function () {
    selectNumberGuestEl.setCustomValidity('');
  };

  var checkSelectNumberGuestEl = function (roomValue) {
    var guestValue = Number(selectNumberGuestEl.value);
    if (guestValue === 0 && roomValue !== 100) {
      getErrorInputGuest(roomValue);
    } else if (roomValue === 100 && guestValue !== 0) {
      getErrorInputGuest(roomValue);
    } else if (guestValue > roomValue) {
      getErrorInputGuest(roomValue);
    } else {
      getValidatedInputGuest();
    }
  };

  var validateInputGuest = function () {
    checkSelectNumberGuestEl(Number(selectRoomNumberEl.value));
  };

  selectNumberGuestEl.addEventListener('change', validateInputGuest);
  adFormSubmitBtn.addEventListener('click', validateInputGuest);

  addTimeChangeHandler(getTimeInEl(), getTimeOutEl());
  addTimeChangeHandler(getTimeOutEl(), getTimeInEl());
  addOfferTypeChangeHandler();
  disableMapFilters();
  disableForm();

  window.form = {
    removeDisabledForm: removeDisabledForm,
    activateForm: activateForm,
    activateMapFilters: activateMapFilters,
  };
})();
