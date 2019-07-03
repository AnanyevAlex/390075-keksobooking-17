'use strict';
(function () {
  var ADS_COUNT = 5;

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

  var shuffler = function (arr) {
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

  var drawPins = function (pin) {
    var templatePinEl = getTemplatePinEl();
    var mapPinEl = getMapPinEl();
    var fragmentPin = document.createDocumentFragment();
    var randomPinArr = shuffler(pin);

    for (var k = 0; k < ADS_COUNT; k++) {
      fragmentPin.appendChild(addPinInfo(randomPinArr[k], templatePinEl));
    }
    mapPinEl.appendChild(fragmentPin);
    return mapPinEl;
  };

  var createErrorMessage = function (errorMessage) {
    var errorBlockEl = getErrorMessageEl();
    var mapBlock = window.mapAction.mapBlockEl;
    var errorBlock = errorBlockEl.cloneNode(true);
    var errorMessageText = errorBlock.querySelector('.error__message');
    errorMessageText.textContent = errorMessage;
    mapBlock.appendChild(errorBlock);
  };

  var successHandler = function (pin) {
    drawPins(pin);
  };

  var errorHandler = function (errorMessage) {
    createErrorMessage(errorMessage);
  };

  var loadPinsData = function () {
    window.load.loadPinsData(successHandler, errorHandler);
  };

  window.pin = {
    loadPinsData: loadPinsData,
  };
})();
