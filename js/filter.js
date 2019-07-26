'use strict';
(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var housingTypeEl = document.querySelector('#housing-type');
  var housingPriceEl = document.querySelector('#housing-price');
  var housingRoomEl = document.querySelector('#housing-rooms');
  var housingGuestEl = document.querySelector('#housing-guests');
  var featuresButtonsEl = document.querySelectorAll('input[name="features"]');


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
      window.card.removeCardBlock();
      if (housingTypeEl.value === 'any') {
        window.pin.drawPins(adsArr);
      }
      var filteredAdsByType = adsArr.filter(function (it) {
        return it.offer.type === housingTypeEl.value;
      });
      window.pin.drawPins(filteredAdsByType);
    });

    // фильтр по цене
    housingPriceEl.addEventListener('change', function () {
      removePins();
      window.card.removeCardBlock();
      if (housingPriceEl.value === 'any') {
        window.pin.drawPins(adsArr);
      }
      var filteredAdsByPrice = adsArr.filter(function (it) {
        switch (housingPriceEl.value) {
          case 'middle':
            return it.offer.price >= MIN_PRICE && it.offer.price < MAX_PRICE;
          case 'low':
            return it.offer.price < MIN_PRICE;
          case 'high':
            return it.offer.price > MAX_PRICE;
        }
      });
      window.pin.drawPins(filteredAdsByPrice);
    });

    // фильтр количество комнат
    housingRoomEl.addEventListener('change', function () {

      removePins();
      window.card.removeCardBlock();
      if (housingRoomEl.value === 'any') {
        window.pin.drawPins(adsArr);
      }
      var filteredAdsByRooms = adsArr.filter(function (it) {
        return it.offer.rooms === Number(housingRoomEl.value);
      });
      window.pin.drawPins(filteredAdsByRooms);
    });

    // фильтр по гостям
    housingGuestEl.addEventListener('change', function () {

      removePins();
      window.card.removeCardBlock();
      if (housingGuestEl.value === 'any') {
        window.pin.drawPins(adsArr);
      }
      var filteredAdsByGuest = adsArr.filter(function (it) {
        return it.offer.guests === Number(housingGuestEl.value);
      });
      window.pin.drawPins(filteredAdsByGuest);
    });

    // фильтр по удобствам
    featuresButtonsEl.forEach(function (it) {
      it.addEventListener('change', function() {
        removePins();
        window.card.removeCardBlock();
        var selectedFeaturesElChecked = document.querySelectorAll('input[name="features"]:checked');
        var features = Array.from(selectedFeaturesElChecked);
        var selectedFeaturesValues = features.map(function (it) {
          return it.value;
        });

        if (selectedFeaturesValues.length === 0) {
          window.pin.drawPins(adsArr);
        }

        var input = it;
debugger
console.log(selectedFeaturesValues)
        if (input.checked) {
          var filteredAdsByFeatures = adsArr.filter(function (it) {
            var featuresInAd = it.offer.features;
            /*for (var i = 0; i < selectedFeaturesValues.length; i++) {
              if (featuresInAd.includes(input.value)) {
                return it;
              }
            }*/
            featuresInAd.includes(selectedFeaturesValues)
          });
          window.pin.drawPins(filteredAdsByFeatures);
        } else {
          window.pin.drawPins(adsArr);
        }
      });

    });

  };

  window.filter = {
    filterPins: filterPins,
    setAdsArr: setAdsArr,
    removePins: removePins,
  };
})();
