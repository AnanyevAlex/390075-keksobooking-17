'use strict';
(function () {
  var ADS_COUNT = 8;
  var MAP_Y_MAX_VALUE = 630;
  var MAP_Y_MIN_VALUE = 130;
  var MAP_X_MAX_VALUE = 1200;
  var MAP_X_MIN_VALUE = 0;

  var getMapPinEl = function () {
    return document.querySelector('.map__pins');
  };

  var getErrorMessageEl = function () {
    var errorMessageEl = document.querySelector('#error')
    .content
    .querySelector('.error');

    return errorMessageEl;
  };

  window.data = {
    ADS_COUNT: ADS_COUNT,
    getMapPinEl: getMapPinEl,
    getErrorMessageEl: getErrorMessageEl,
    MAP_Y_MAX_VALUE: MAP_Y_MAX_VALUE,
    MAP_Y_MIN_VALUE: MAP_Y_MIN_VALUE,
    MAP_X_MAX_VALUE: MAP_X_MAX_VALUE,
    MAP_X_MIN_VALUE: MAP_X_MIN_VALUE
  };
})();
