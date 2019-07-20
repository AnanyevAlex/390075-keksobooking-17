'use strict';
(function () {
  var ADS_MAX_COUNT = 5;
  var mapPinsEl = document.querySelector('.map__pins');

  var addPinInfo = function (ad, template, index) {
    var pinElement = template.cloneNode(true);
    if (ad.offer) {
      pinElement.style.left = ad.location.x + 'px';
      pinElement.style.top = ad.location.y + 'px';
      pinElement.setAttribute('data', index);
      var avatarImageEl = pinElement.querySelector('img');
      avatarImageEl.src = ad.author.avatar;
      avatarImageEl.alt = ad.offer.title;
    }
    return pinElement;
  };

  var getTemplatePinEl = function () {
    return document.querySelector('#pin').content.querySelector('.map__pin');
  };

  var createFragmentPin = function (ads) {
    var fragmentPin = document.createDocumentFragment();
    var slicedPinsAds = ads.slice(0, ADS_MAX_COUNT);
    for (var k = 0; k < slicedPinsAds.length; k++) {
      fragmentPin.appendChild(addPinInfo(slicedPinsAds[k], getTemplatePinEl(), k));
    }
    return fragmentPin;
  };

  var adsInfo = [];
  var drawPins = function (ads) {
    var fragmentPin = createFragmentPin(ads);
    adsInfo = ads;
    mapPinsEl.appendChild(fragmentPin);
    return mapPinsEl;
  };

  var selectedPin;

  mapPinsEl.addEventListener('click', function (event) {
    var target = event.target.closest('button');
    if (!target) {
      return;
    }

    if (target.classList.value === 'map__pin') {
      addClassTargetPin(target);
      var pinIndex = target.getAttribute('data');
      var adInfo = adsInfo[pinIndex];
      window.card.drawCard(adInfo);
    }
  });

  var addClassTargetPin = function (pin) {
    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
    }
    selectedPin = pin;
    selectedPin.classList.add('map__pin--active');
  };

  window.pin = {
    drawPins: drawPins,
  };

})();
