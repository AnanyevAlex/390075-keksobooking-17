'use strict';

var ADS_COUNT = 8;
var AVATAR_IMG_EXTENSION = '.png';
var AVATAR_IMG_SRC = 'img/avatars/user';
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var MAP_MAIN_PIN_WIDTH = 65;
var MAP_MAIN_PIN_HEIGHT = 65;
var MAP_Y_MAX_VALUE = 630;
var MAP_Y_MIN_VALUE = 130;
var MAP_X_MAX_VALUE = 1200;
var MAP_X_MIN_VALUE = 0;
var MIN_PRICE_OF_TYPE_OFFER = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};

var getRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAvatarImgSrc = function (numberads) {
  return AVATAR_IMG_SRC + '0' + numberads + AVATAR_IMG_EXTENSION;
};

var removeMapFaded = function () {
  var mapBlock = document.querySelector('.map');
  mapBlock.classList.remove('map--faded');
};

var getTemplatePinEl = function () {
  var templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  return templatePin;
};

var getTypeOffer = function () {
  return OFFER_TYPES[getRandomNumber(3, 0)];
};

var getMapPin = function () {
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
  var avatarImage = pinElement.querySelector('img');
  avatarImage.src = ad.avatar;
  avatarImage.alt = ad.offer;

  return pinElement;
};

var generatePins = function () {
  var templatePin = getTemplatePinEl();
  var ads = generateAds();
  var fragmentPin = document.createDocumentFragment();

  for (var k = 0; k < ads.length; k++) {
    fragmentPin.appendChild(addPinInfo(ads[k], templatePin));
  }

  return fragmentPin;
};

var addMapPin = function () {
  var mapPin = getMapPin();
  mapPin.appendChild(generatePins());
};

var getAdFormEl = function () {
  var adForm = document.querySelector('.ad-form');
  return adForm;
};

var getMapFiltersEl = function () {
  var mapFilters = document.querySelector('.map__filters');
  return mapFilters;
};

var getAdFieldset = function () {
  var adFormFieldset = document.querySelectorAll('.ad-form__element');
  return adFormFieldset;
};

var disableForm = function () {
  var adFormFieldset = getAdFieldset();

  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].setAttribute('disabled', 'disabled');
  }
};

var disableMapFilters = function () {
  var mapFilters = getMapFiltersEl();
  mapFilters.setAttribute('disabled', 'disabled');
};

var activateMapFilters = function () {
  var mapFilters = getMapFiltersEl();
  mapFilters.removeAttribute('disabled', 'disabled');
};

var activateForm = function () {
  var adFormFieldset = getAdFieldset();

  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].removeAttribute('disabled', 'disabled');
  }
};

var removeDisabledForm = function () {
  var adForm = getAdFormEl();

  adForm.classList.remove('ad-form--disabled');
};

var getMainMapPinEl = function () {
  return document.querySelector('.map__pin--main');
};

var mainMapPin = getMainMapPinEl();

var getLocationMainPin = function () {
  var pinLocation = mainMapPin;
  var posX = Math.floor(pinLocation.offsetTop + MAP_MAIN_PIN_WIDTH / 2);
  var posY = Math.floor(pinLocation.offsetLeft + MAP_MAIN_PIN_HEIGHT / 2);
  return posX + ', ' + posY;
};

var getInputAddressEl = function () {
  return document.querySelector('#address');
};

var addInputValue = function () {
  var inputAddress = getInputAddressEl();
  inputAddress.value = getLocationMainPin();
};

var disableInputAddress = function () {
  var inputAddress = getInputAddressEl();
  inputAddress.setAttribute('disabled', 'disabled');
};

var mapPinClickHandler = function () {
  removeMapFaded();
  removeDisabledForm();
  activateForm();
  addMapPin();
  activateMapFilters();
  disableInputAddress();
  mainMapPin.removeEventListener('mouseup', mapPinClickHandler);
};

var addOfferTypeChangeHandler = function () {
  var offerTypeSelectEl = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');

  offerTypeSelectEl.addEventListener('change', function () {
    inputPrice.placeholder = MIN_PRICE_OF_TYPE_OFFER[offerTypeSelectEl.value];
    inputPrice.min = MIN_PRICE_OF_TYPE_OFFER[offerTypeSelectEl.value];
  });
};

var getTimeInEl = function () {
  var timeIn = document.querySelector('#timein');
  return timeIn;
};

var getTimeOutEl = function () {
  var timeOut = document.querySelector('#timeout');
  return timeOut;
};

var addTimeChangeHandler = function (timeSelectField, relatedTimeSelectField) {
  timeSelectField.addEventListener('change', function (evt) {
    relatedTimeSelectField.value = evt.target.value;
  });
};

disableMapFilters();
addTimeChangeHandler(getTimeInEl(), getTimeOutEl());
addTimeChangeHandler(getTimeOutEl(), getTimeInEl());
addOfferTypeChangeHandler();
mainMapPin.addEventListener('mouseup', mapPinClickHandler);
addInputValue();
disableForm();
