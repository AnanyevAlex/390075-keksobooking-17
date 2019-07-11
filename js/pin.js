'use strict';
(function () {
  var ADS_MAX_COUNT = 5;

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
      fragmentPin.appendChild(addPinInfo(slicedPinsAds[k], getTemplatePinEl()));
    }
    return fragmentPin;
  };

  var drawPins = function (ads) {
    var mapPinEl = document.querySelector('.map__pins');
    var fragmentPin = createFragmentPin(ads);

    mapPinEl.appendChild(fragmentPin);
    return mapPinEl;
  };

  window.pin = {
    drawPins: drawPins,
  };

})();
