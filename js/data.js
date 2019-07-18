'use strict';
(function () {
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

  var showErrorMessage = function (errorMessage) {
    var errorBlockEl = document.querySelector('#error').content.querySelector('.error');
    var mapBlockEl = window.mapAction.mapBlockEl;
    var errorBlock = errorBlockEl.cloneNode(true);
    var errorMessageText = errorBlock.querySelector('.error__message');
    errorMessageText.textContent = errorMessage;
    mapBlockEl.appendChild(errorBlock);
  };

  var adsArr = [];
  var successHandler = function (ads) {
    adsArr = shuffle(ads);
    window.pin.drawPins(adsArr);
    window.filter.setAdsArr(ads);
  };

  var errorHandler = function (errorMessage) {
    showErrorMessage(errorMessage);
  };

  var loadData = function () {
    window.load.loadData(successHandler, window.successForm.errorHandler);
  };

  window.data = {
    loadData: loadData,
  };
})();
