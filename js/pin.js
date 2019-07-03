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

  var getTemplatePinEl = function () {
    var templatePinEl = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    return templatePinEl;
  };

/*  function getRandomSet(lo, hi, n) {
    var res = new Set();
    while (res.size < n) res.add(Math.floor(Math.random() * (hi - lo + 1)) + lo);
    return res;
  }
*/
  var drawPins = function (pin) {
    var templatePinEl = getTemplatePinEl();
    var mapPinEl = getMapPinEl();
    var fragmentPin = document.createDocumentFragment();

    for (var k = 0; k < ADS_COUNT; k++) {
      var randomPin = [];
debugger
    while (randomPin.size < 5) randomPin.add(Math.floor(Math.random() * (pin.length - 0 + 1)) + 0);

    console.log(randomPin)



      fragmentPin.appendChild(addPinInfo(pin[k], templatePinEl));
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
