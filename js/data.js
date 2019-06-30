'use strict';
(function () {
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

  var addMapPin = function () {
    var mapPinEl = getMapPinEl();
    mapPinEl.appendChild(window.pin.generatePins());
  };

  window.data = {
    generateAds: generateAds,
    addMapPin: addMapPin,
    MAP_Y_MAX_VALUE: MAP_Y_MAX_VALUE,
    MAP_Y_MIN_VALUE: MAP_Y_MIN_VALUE,
    MAP_X_MAX_VALUE: MAP_X_MAX_VALUE,
    MAP_X_MIN_VALUE: MAP_X_MIN_VALUE
  };
})();
