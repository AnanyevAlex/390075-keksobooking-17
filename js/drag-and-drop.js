'use strict';
(function () {
  var MAP_MAIN_PIN_WIDTH = 65;
  var MAP_MAIN_PIN_HEIGHT = 81;
  var MAP_Y_MAX_VALUE = 630;
  var MAP_Y_MIN_VALUE = 130;
  var MAP_X_MAX_VALUE = 1200;
  var MAP_X_MIN_VALUE = 0;
  var mainMapPinEl = document.querySelector('.map__pin--main');

  var removeMapFaded = function () {
    mapBlockEl.classList.remove('map--faded');
  };

  var getInputAddressEl = function () {
    return document.querySelector('#address');
  };

  var disableInputAddress = function () {
    var inputAddressEl = getInputAddressEl();
    inputAddressEl.setAttribute("readonly", "readonly");
  };

  var mapBlockEl = window.mapAction.mapBlockEl;
  mainMapPinEl.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var inputAddressEl = getInputAddressEl();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      if (mapBlockEl.classList.contains('map--faded')) {
        debugger
        window.activatePage.activatePage(true);
        /*removeMapFaded();
        window.data.loadData();
        window.form.initializationMap();
        window.filter.filterPins();
        disableInputAddress();*/
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

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      if (mapBlockEl.classList.contains('map--faded')) {
        window.activatePage.activatePage(true);
        /*removeMapFaded();
        window.data.loadData();
        window.form.initializationMap();
        window.filter.filterPins();
        disableInputAddress();*/
      }

      mapBlockEl.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    mapBlockEl.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
