'use strict';
(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var housingTypeEl = document.querySelector('#housing-type');
  var housingPriceEl = document.querySelector('#housing-price');
  var housingRoomEl = document.querySelector('#housing-rooms');
  var housingGuestEl = document.querySelector('#housing-guests');
  var featuresButtonsEl = document.querySelectorAll('input[name="features"]');
  var mapFiltersEl = document.querySelector('.map__filters');
  // дефолтный фильтр
  var housingType = 'any';
  var housingPrice = 'any';
  var housingRooms = 'any';
  var housingGuests = 'any';
  var isWifi = false;
  var isDishwasher = false;
  var isParking = false;
  var isWasher = false;
  var isElevator = false;
  var isConditioner = false;
  var backupData;
  var filters = [];


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



  var checkFeature = function (featureButton) {
    return featureButton.checked;
  };

  var removeFilter = function (element) {
    var index = filters.indexOf(element);
    if (index > -1) {
      filters.splice(index, 1);
    }
  };

  var fillFilterArray = function (filterName, filterValue) {
    if ((filterValue === 'any') || (filterValue === false)) {
      removeFilter(filterName);
    } else {
      var index = filters.indexOf(filterName);
      if (index > -1) {
        removeFilter(filterName);
        filters.push(filterName);
      } else {
        filters.push(filterName);
      }
    }
  };

  // селекты

  mapFiltersEl.addEventListener('change', function (evt) {
    debugger
    var target = evt.target;
    switch (target.dataset.filter) {
      case 'type':
        housingType = target.value;
        fillFilterArray(filterType, housingType);
        break;
      case 'price':
        housingPrice = target.value;
        fillFilterArray(filterPrice, housingPrice);
        break;
      case 'rooms':
        housingRooms = target.value;
        fillFilterArray(filterRooms, housingRooms);
        break;
      case 'guests':
        housingGuests = target.value;
        fillFilterArray(filterGuests, housingGuests);
        break;
      case 'wifi':
        isWifi = checkFeature(featureWifi);
        fillFilterArray(filterWifi, isWifi);
        break;
      case 'dishwasher':
        isDishwasher = checkFeature(featureDishwasher);
        fillFilterArray(filterDishwasher, isDishwasher);
        break;
      case 'parking':
        isParking = checkFeature(featureParking);
        fillFilterArray(filterParking, isParking);
        break;
      case 'washer':
        isWasher = checkFeature(featureWasher);
        fillFilterArray(filterWasher, isWasher);
        break;
      case 'elevator':
        isElevator = checkFeature(featureElevator);
        fillFilterArray(filterElevator, isElevator);
        break;
      case 'conditioner':
        isConditioner = checkFeature(featureConditioner);
        fillFilterArray(filterConditioner, isConditioner);
        break;
    }
    window.debounce.debounce(function () {
      removePins();
      window.card.removeCardBlock();
      window.updatePins();
    });
  });


  // functions of selector filters
  var filterType = function (it) {
    return it.offer.type === housingType;
  };

  var filterPrice = function (it) {
    if (housingPrice === 'low') {
      return it.offer.price <= MIN_PRICE;
    } else if (housingPrice === 'middle') {
      return it.offer.price > MIN_PRICE && it.offer.price < MAX_PRICE;
    } else if (housingPrice === 'high') {
      return it.offer.price >= MAX_PRICE;
    }
    return true;
  };

  var filterRooms = function (it) {
    return housingRooms === it.offer.rooms.toString();
  };

  var filterGuests = function (it) {
    return housingGuests === it.offer.guests.toString();
  };

  // universal function of filtering any feature
  var filterFeature = function (featureName) {
    var filterFunction = function (it) {
      return it.offer.features.indexOf(featureName) > -1;
    };
    return filterFunction;
  };

  var filterWifi = filterFeature('wifi');
  var filterDishwasher = filterFeature('dishwasher');
  var filterParking = filterFeature('parking');
  var filterWasher = filterFeature('washer');
  var filterElevator = filterFeature('elevator');
  var filterConditioner = filterFeature('conditioner');

  /* UPDATE PINS */

  window.updatePins = function (data) {

    // backup of data;
    if (data) {
      backupData = data;
    }

    /* !!!! In the fallowing function I didn't change the code,
    because by meaning the cycle should not stop on the first
    true/false, but only on false. */

    var result = adsArr.filter(function (elem) {
      for (var i = 0; i < filters.length; i++) {
        if (filters[i](elem) === false) {
          return false;
        }
      }
      return true;
    });

    window.pin.drawPins(result);
  };















  /*var filterPins = function () {
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
            for (var i = 0; i < selectedFeaturesValues.length; i++) {
              if (featuresInAd.includes(input.value)) {
                return it;
              }
            }
            featuresInAd.includes(selectedFeaturesValues)
          });
          window.pin.drawPins(filteredAdsByFeatures);
        } else {
          window.pin.drawPins(adsArr);
        }
      });

    });

  };*/

  window.filter = {
    /*filterPins: filterPins,*/
    setAdsArr: setAdsArr,
    removePins: removePins,
  };
})();
