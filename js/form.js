'use strict';
(function () {
  var MIN_PRICE_OF_TYPE_OFFER = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
  var adFormEl = document.querySelector('.ad-form');

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

  var adFormSubmitBtn = document.querySelector('.ad-form__submit');
  adFormSubmitBtn.addEventListener('click', function () {
        var filterRoom = document.querySelector('#room_number');
        var filterQuests = document.querySelector('#capacity');

        if (filterRoom.value < filterQuests.value) {
          filterRoom.setCustomValidity('Увеличьте количество комнат!');
          filterQuests.setCustomValidity('Увеличьте количество комнат!');
        }
      });

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
