'use strict';
(function () {
  var mapBlockEl = document.querySelector('.map');

  var removeMapFaded = function () {
    mapBlockEl.classList.remove('map--faded');
  };

  var getMainMapPinEl = function () {
    return document.querySelector('.map__pin--main');
  };

  var mainMapPinEl = getMainMapPinEl();

  var getInputAddressEl = function () {
    return document.querySelector('#address');
  };

  var disableInputAddress = function () {
    var inputAddressEl = getInputAddressEl();
    inputAddressEl.setAttribute('disabled', 'disabled');
  };

  window.mapAction = {
    getInputAddressEl: getInputAddressEl,
    mainMapPinEl: mainMapPinEl,
    mapBlockEl: mapBlockEl,
    removeMapFaded: removeMapFaded,
    disableInputAddress: disableInputAddress
  };
})();
