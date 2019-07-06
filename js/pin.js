'use strict';
(function () {
  var getMapPinEl = function () {
    return document.querySelector('.map__pins');
  };

  var getErrorMessageEl = function () {
    var errorMessageEl = document.querySelector('#error')
    .content
    .querySelector('.error');

    return errorMessageEl;
  };

  var addPinInfo = function (ad, template) {
    var pinElement = template.cloneNode(true);
    if (ad.offer) {
      pinElement.style.left = ad.location.x + 'px';
      pinElement.style.top = ad.location.y + 'px';
      var avatarImageEl = pinElement.querySelector('img');
      avatarImageEl.src = ad.author.avatar;
      avatarImageEl.alt = ad.offer.title;
    }
    return pinElement;
  };

  var random = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var getTemplatePinEl = function () {
    var templatePinEl = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    return templatePinEl;
  };

  // фильтр по пину

  var filterPins = function () {
    var filterOffer = document.querySelector('#housing-type');
    var mapForPins = document.querySelector('.map__pins');
    filterOffer.addEventListener('change', function () {
      var buttonPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      buttonPin = Array.prototype.slice.call(buttonPin);
      buttonPin.forEach(function (it) {
        mapForPins.removeChild(it);
      });
      var arrFilterOffer = [];
      arrFilterOffer = pinsArr.filter(function (it) {
        return it.offer.type === filterOffer.value;
      });
      drawPins(arrFilterOffer);
    });
  };

  var templatePinEl = getTemplatePinEl();
  var mapPinEl = getMapPinEl();
  var fragmentPin = document.createDocumentFragment();

  var drawPins = function (pin) {
    var adsCount = 5;
    var randomPinArr = random(pin);
    if (randomPinArr.length < adsCount) {
      adsCount = randomPinArr.length;
    }
    for (var k = 0; k < adsCount; k++) {
      fragmentPin.appendChild(addPinInfo(randomPinArr[k], templatePinEl));
    }
    mapPinEl.appendChild(fragmentPin);
    return mapPinEl;
  };

  var createErrorMessage = function (errorMessage) {
    var errorBlockEl = getErrorMessageEl();
    var mapBlock = window.mapForPinsction.mapBlockEl;
    var errorBlock = errorBlockEl.cloneNode(true);
    var errorMessageText = errorBlock.querySelector('.error__message');
    errorMessageText.textContent = errorMessage;
    mapBlock.appendChild(errorBlock);
  };

  var pinsArr = [];
  var successHandler = function (pin) {
    drawPins(pin);
    pinsArr = pin;
  };

  var errorHandler = function (errorMessage) {
    createErrorMessage(errorMessage);
  };

  var loadPinsData = function () {
    window.load.loadPinsData(successHandler, errorHandler);
  };

  window.pin = {
    loadPinsData: loadPinsData,
    filterPins: filterPins
  };
})();
