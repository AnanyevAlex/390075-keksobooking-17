'use strict';
(function () {
  var addPinInfo = function (ad, template) {
    var pinElement = template.cloneNode(true);
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = ad.location.y + 'px';
    var avatarImageEl = pinElement.querySelector('img');
    avatarImageEl.src = ad.avatar;
    avatarImageEl.alt = ad.offer;

    return pinElement;
  };

  var getTemplatePinEl = function () {
    var templatePinEl = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    return templatePinEl;
  };

  var generatePins = function () {
    var templatePinEl = getTemplatePinEl();
    var ads = window.data.generateAds();
    var fragmentPin = document.createDocumentFragment();

    for (var k = 0; k < ads.length; k++) {
      fragmentPin.appendChild(addPinInfo(ads[k], templatePinEl));
    }

    return fragmentPin;
  };

  window.pin = {
    generatePins: generatePins,
  };
})();
