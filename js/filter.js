'use strict';
(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var mapFiltersEl = document.querySelector('.map__filters');
  var featureWifiEl = document.querySelector('#filter-wifi');
  var featureDishwasherEl = document.querySelector('#filter-dishwasher');
  var featureParkingEl = document.querySelector('#filter-parking');
  var featureWasherEl = document.querySelector('#filter-washer');
  var featureElevatorEl = document.querySelector('#filter-elevator');
  var featureConditionerEl = document.querySelector('#filter-conditioner');
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
        isWifi = checkFeature(featureWifiEl);
        fillFilterArray(filterWifi, isWifi);
        break;
      case 'dishwasher':
        isDishwasher = checkFeature(featureDishwasherEl);
        fillFilterArray(filterDishwasher, isDishwasher);
        break;
      case 'parking':
        isParking = checkFeature(featureParkingEl);
        fillFilterArray(filterParking, isParking);
        break;
      case 'washer':
        isWasher = checkFeature(featureWasherEl);
        fillFilterArray(filterWasher, isWasher);
        break;
      case 'elevator':
        isElevator = checkFeature(featureElevatorEl);
        fillFilterArray(filterElevator, isElevator);
        break;
      case 'conditioner':
        isConditioner = checkFeature(featureConditionerEl);
        fillFilterArray(filterConditioner, isConditioner);
        break;
    }
    window.debounce.debounce(function () {
      removePins();
      window.card.removeCardBlock();
      updatePins();
    });
  });

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

  var updatePins = function () {
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
  window.filter = {
    setAdsArr: setAdsArr,
    removePins: removePins,
  };
})();
