'use strict';

var ADS_COUNT = 8;
var AVATAR_IMG_EXTENSION = '.png';
var AVATAR_IMG_SRC = 'img/avatars/user';
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var MAP_Y_MAX_VALUE = 630;
var MAP_Y_MIN_VALUE = 130;
var MAP_X_MAX_VALUE = 1200;
var MAP_X_MIN_VALUE = 0;


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

var getTemplatePin = function () {
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
  var templatePin = getTemplatePin();
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

removeMapFaded();
addMapPin();
