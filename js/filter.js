'use strict';
(function () {
  var housingTypeEl = document.querySelector('#housing-type');
  var mapPinsEl = document.querySelector('.map__pins');
  var adsArr = [];

  var getAdsArr = function (ads) {
    adsArr = ads;
  };

  var removePins = function () {
    var buttonPinsEl = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    buttonPinsEl.forEach(function (it) {
      mapPinsEl.removeChild(it);
    });
  };

  var filterPins = function () {
    housingTypeEl.addEventListener('change', function () {
      removePins();
      var filteredAdsByType = [];
      filteredAdsByType = adsArr.filter(function (it) {
        return it.offer.type === housingTypeEl.value;
      });
      window.pin.drawPins(filteredAdsByType);
    });
  };

  window.filter = {
    filterPins: filterPins,
    getAdsArr: getAdsArr
  };
})();