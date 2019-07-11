'use strict';
(function () {
  var MAP_MAIN_PIN_WIDTH = 65;
  var MAP_MAIN_PIN_HEIGHT = 81;
  var MAP_Y_MAX_VALUE = 630;
  var MAP_Y_MIN_VALUE = 130;
  var MAP_X_MAX_VALUE = 1200;
  var MAP_X_MIN_VALUE = 0;

  var getMainMapPinEl = function () {
    return document.querySelector('.map__pin--main');
  };

  var mainMapPinEl = getMainMapPinEl();

  var removeMapFaded = function () {
    mapBlockEl.classList.remove('map--faded');
  };

  var getInputAddressEl = function () {
    return document.querySelector('#address');
  };

  var disableInputAddress = function () {
    var inputAddressEl = getInputAddressEl();
    inputAddressEl.setAttribute('disabled', 'disabled');
  };

  var mapBlockEl = window.mapAction.mapBlockEl;
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
        window.data.loadPinsData();
        window.form.removeDisabledForm();
        window.form.activateForm();
        window.form.activateMapFilters();
        window.filter.filterPins();
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

      var pinYCoord = Math.max(MAP_Y_MIN_VALUE - MAP_MAIN_PIN_HEIGHT, Math.min(MAP_Y_MAX_VALUE - MAP_MAIN_PIN_HEIGHT, (mainMapPinEl.offsetTop - shift.y)));
      var pinXCoord = Math.max(MAP_X_MIN_VALUE - MAP_MAIN_PIN_WIDTH / 2, Math.min(MAP_X_MAX_VALUE - MAP_MAIN_PIN_WIDTH / 2, (mainMapPinEl.offsetLeft - shift.x)));

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
        window.data.loadPinsData();
        window.form.removeDisabledForm();
        window.form.activateForm();
        window.form.activateMapFilters();
        window.filter.filterPins();
        disableInputAddress();
      }

      mapBlockEl.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    mapBlockEl.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
