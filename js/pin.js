'use strict';
(function () {
  var ADS_MAX_COUNT = 5;
  var mapPinEl = document.querySelector('.map__pins');

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
    var templatePinEl = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    return templatePinEl;
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
    mapPinEl.appendChild(fragmentPin);
    return mapPinEl;
  };

  mapPinEl.onclick = function (event) {
    var target = event.target;

    while (target.classList.value !== 'map__pins') {
      if (target.classList.value === 'map__pin') {
        var pinIndex = target.getAttribute('data');
        var adInfo = adsInfo[pinIndex];
        window.card.drawCard(adInfo);
      }
      target = target.parentNode;
    }
  };

  window.pin = {
    drawPins: drawPins,
  };

})();
