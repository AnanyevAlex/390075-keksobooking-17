'use strict';
(function () {
  var ADS_MAX_COUNT = 5;
  var housingTypeEl = document.querySelector('#housing-type');
  var mapPinsEl = document.querySelector('.map__pins');

  var getMapPinEl = function () {
    return document.querySelector('.map__pins');
  };

  var getErrorMessageEl = function () {
    var errorMessageEl = document.querySelector('#error')
    .content
    .querySelector('.error');

    return errorMessageEl;
  };

  var addPinInfo = function (ad, template) {
    var pinElement = template.cloneNode(true);
    if (ad.offer) {
      pinElement.style.left = ad.location.x + 'px';
      pinElement.style.top = ad.location.y + 'px';
      var avatarImageEl = pinElement.querySelector('img');
      avatarImageEl.src = ad.author.avatar;
      avatarImageEl.alt = ad.offer.title;
    }
    return pinElement;
  };

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

  var getTemplatePinEl = function () {
    var templatePinEl = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    return templatePinEl;
  };

    var buttonPinsEl = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var removePins = function () {

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
      drawPins(filteredAdsByType);
    });
  };

  var filterAds = function (ads) {
    var shuffledAds = shuffle(ads);
    var shuffledAdsSlice = shuffledAds.slice(0, ADS_MAX_COUNT);
    return shuffledAdsSlice

  }

  var createFragmentPin = function (ads) {
    var fragmentPin = document.createDocumentFragment();
    var shuffledAdsSlice = filterAds(ads);
    for (var k = 0; k < shuffledAdsSlice.length; k++) {
      fragmentPin.appendChild(addPinInfo(shuffledAdsSlice[k], getTemplatePinEl()));
    }
    return fragmentPin;
  };

  var drawPins = function (ads) {
    var mapPinEl = getMapPinEl();
    var fragmentPin = createFragmentPin(ads);

    mapPinEl.appendChild(fragmentPin);
    return mapPinEl;
  };

  // var onPinClick = function (evt) {
  //   var element = evt.target;
  //   console.log('1')
  //   if (!element.classList.contains('map__pin')) {
  //     element = element.parentElement;
  //   }
  //   if (element.classList.contains('map__pin') && !element.classList.contains('map__pin--main')) {
  //     console.log('2')
  //     showCard(window.backend.adList[parseInt(element.dataset.index, 10)]);
  //   }
  // };

  // console.log(onPinClick())

  //   buttonPinsEl.addEventListener('clic', function () {
  //     console.log('123')
  //     console.log(buttonPinsEl.dataset.index)
  //   });

  // console.log(onPinClick())

  var createErrorMessage = function (errorMessage) {
    var errorBlockEl = getErrorMessageEl();
    var mapBlock = window.mapAction.mapBlockEl;
    var errorBlock = errorBlockEl.cloneNode(true);
    var errorMessageText = errorBlock.querySelector('.error__message');
    errorMessageText.textContent = errorMessage;
    mapBlock.appendChild(errorBlock);
  };

  var adsArr = [];
  var successHandler = function (ads) {
    drawPins(ads);
    adsArr = ads;
  };

  var errorHandler = function (errorMessage) {
    createErrorMessage(errorMessage);
  };

  var loadPinsData = function () {
    window.load.loadPinsData(successHandler, errorHandler);
  };

  // var showAdsInfo = function () {
  //   window.card.drawCard();
  // }

  window.pin = {
    loadPinsData: loadPinsData,
    filterPins: filterPins
  };
})();
