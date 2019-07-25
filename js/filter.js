'use strict';
(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var housingTypeEl = document.querySelector('#housing-type');
  var housingRoomEl = document.querySelector('#housing-rooms');
  var housingGuestEl = document.querySelector('#housing-guests');
  var housingPriceEl = document.querySelector('#housing-price');
  var selectedFeaturesEl = document.querySelectorAll('input[name="features"]:checked');

  var mapPinsEl = document.querySelector('.map__pins');
  var adsArr = [];

  var setAdsArr = function (ads) {
    adsArr = ads;
  };

  var removePins = function () {
    var buttonPinsEl = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    buttonPinsEl.forEach(function (it) {
      mapPinsEl.removeChild(it);
    });
  };

  var filterPins = function () {
    // фильтр тип жилья
    housingTypeEl.addEventListener('change', function () {

      removePins();
      if (housingTypeEl.value === 'any') {
        window.pin.drawPins(adsArr);
      }
      var filteredAdsByType = adsArr.filter(function (it) {
        return it.offer.type === housingTypeEl.value;
      });
      window.pin.drawPins(filteredAdsByType);
    });
    // фильтр количество комнат
    housingRoomEl.addEventListener('change', function () {

      removePins();
      if (housingRoomEl.value === 'any') {
        window.pin.drawPins(adsArr);
      }
      var filteredAdsByRooms = adsArr.filter(function (it) {
        return it.offer.rooms === Number(housingRoomEl.value);
      });
      window.pin.drawPins(filteredAdsByRooms);

    });
  };

  window.filter = {
    filterPins: filterPins,
    setAdsArr: setAdsArr,
    removePins: removePins,
  };
})();
