'use strict';

/*var ADS_COUNT = 8;
var AVATAR_IMG_EXTENSION = '.png';
var AVATAR_IMG_SRC = 'img/avatars/user';
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;*/
/*var MAP_MAIN_PIN_WIDTH = 65;
var MAP_MAIN_PIN_HEIGHT = 81;*/
/*var MAP_Y_MAX_VALUE = 630;
var MAP_Y_MIN_VALUE = 130;
var MAP_X_MAX_VALUE = 1200;
var MAP_X_MIN_VALUE = 0;*/
/*var MIN_PRICE_OF_TYPE_OFFER = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};*/

/*var getRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
*/
/*var mapBlockEl = document.querySelector('.map');

var removeMapFaded = function () {
  mapBlockEl.classList.remove('map--faded');
};*/

/*var getAvatarImgSrc = function (numberads) {
  return AVATAR_IMG_SRC + '0' + numberads + AVATAR_IMG_EXTENSION;
};

var mapBlockEl = document.querySelector('.map');

var removeMapFaded = function () {
  mapBlockEl.classList.remove('map--faded');
};

var getTemplatePinEl = function () {
  var templatePinEl = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  return templatePinEl;
};

var getTypeOffer = function () {
  return OFFER_TYPES[getRandomNumber(3, 0)];
};

var getMapPinEl = function () {
  return document.querySelector('.map__pins');
};

var generateAds = function () {
  var ads = [];

  for (var i = 0; i < ADS_COUNT; i++) {
    ads.push({
      avatar: getAvatarImgSrc(i + 1),
      offer: getTypeOffer(),
      location: {
        x: getRandomNumber(MAP_X_MAX_VALUE, MAP_X_MIN_VALUE) - (MAP_PIN_WIDTH / 2),
        y: getRandomNumber(MAP_Y_MAX_VALUE, MAP_Y_MIN_VALUE) - MAP_PIN_HEIGHT,
      }
    });
  }

  return ads;
};

var addPinInfo = function (ad, template) {
  var pinElement = template.cloneNode(true);
  pinElement.style.left = ad.location.x + 'px';
  pinElement.style.top = ad.location.y + 'px';
  var avatarImageEl = pinElement.querySelector('img');
  avatarImageEl.src = ad.avatar;
  avatarImageEl.alt = ad.offer;

  return pinElement;
};

var generatePins = function () {
  var templatePinEl = getTemplatePinEl();
  var ads = generateAds();
  var fragmentPin = document.createDocumentFragment();

  for (var k = 0; k < ads.length; k++) {
    fragmentPin.appendChild(addPinInfo(ads[k], templatePinEl));
  }

  return fragmentPin;
};*/

/*var addMapPin = function () {
  var mapPinEl = getMapPinEl();
  mapPinEl.appendChild(generatePins());
};*/

/*var getAdFormEl = function () {
  var adFormEl = document.querySelector('.ad-form');
  return adFormEl;
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
  var adFormEl = getAdFormEl();

  adFormEl.classList.remove('ad-form--disabled');
};*/
/*
var getMainMapPinEl = function () {
  return document.querySelector('.map__pin--main');
};

var mainMapPinEl = getMainMapPinEl();

var getInputAddressEl = function () {
  return document.querySelector('#address');
};

var disableInputAddress = function () {
  var inputAddressEl = getInputAddressEl();
  inputAddressEl.setAttribute('disabled', 'disabled');
};*/

/*
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
};*/

/*(function () {
  mainMapPinEl.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var inputAddressEl = getInputAddressEl();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (mapBlockEl.classList.contains('map--faded')) {
        removeMapFaded();
        window.data.addMapPin();
        window.form.removeDisabledForm();
        window.form.activateForm();
        window.form.activateMapFilters();
        disableInputAddress();
      }

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinYCoord = Math.max(window.data.MAP_Y_MIN_VALUE - MAP_MAIN_PIN_HEIGHT, Math.min(window.data.MAP_Y_MAX_VALUE - MAP_MAIN_PIN_HEIGHT, (mainMapPinEl.offsetTop - shift.y)));
      var pinXCoord = Math.max(window.data.MAP_X_MIN_VALUE - MAP_MAIN_PIN_WIDTH / 2, Math.min(window.data.MAP_X_MAX_VALUE - MAP_MAIN_PIN_WIDTH / 2, (mainMapPinEl.offsetLeft - shift.x)));

      mainMapPinEl.style.top = pinYCoord + 'px';
      mainMapPinEl.style.left = pinXCoord + 'px';

      var posY = Math.floor((mainMapPinEl.offsetTop - shift.y) + MAP_MAIN_PIN_HEIGHT);
      var posX = Math.floor((mainMapPinEl.offsetLeft - shift.x) + MAP_MAIN_PIN_WIDTH / 2);

      inputAddressEl.value = posX + ', ' + posY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (mapBlockEl.classList.contains('map--faded')) {
        removeMapFaded();
        window.data.addMapPin();
        window.form.removeDisabledForm();
        window.form.activateForm();
        window.form.activateMapFilters();
        disableInputAddress();
      }

      mapBlockEl.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    mapBlockEl.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();*/

