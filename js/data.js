'use strict';
(function () {

  var getErrorMessageEl = function () {
    var errorMessageEl = document.querySelector('#error')
    .content
    .querySelector('.error');

    return errorMessageEl;
  };

  var shuffle = function (arr) {
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

  var createErrorMessage = function (errorMessage) {
    var errorBlockEl = getErrorMessageEl();
    var mapBlock = window.mapAction.mapBlockEl;
    var errorBlock = errorBlockEl.cloneNode(true);
    var errorMessageText = errorBlock.querySelector('.error__message');
    errorMessageText.textContent = errorMessage;
    mapBlock.appendChild(errorBlock);
  };

  var adsArr = [];
  var successHandler = function (ads) {
    adsArr = shuffle(ads);
    window.pin.drawPins(adsArr);
    window.card.drawCard(adsArr);
    window.filter.getAdsArr(ads);
  };

  var errorHandler = function (errorMessage) {
    createErrorMessage(errorMessage);
  };

  var loadPinsData = function () {
    window.load.loadPinsData(successHandler, errorHandler);
  };

  window.data = {
    loadPinsData: loadPinsData,
  };
})();
