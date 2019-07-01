'use strict';
(function () {
  var addPinInfo = function (ad, template) {
    var pinElement = template.cloneNode(true);
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = ad.location.y + 'px';
    var avatarImageEl = pinElement.querySelector('img');
    avatarImageEl.src = ad.author.avatar;
    avatarImageEl.alt = ad.offer.title;

    return pinElement;
  };

  var getTemplatePinEl = function () {
    var templatePinEl = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    return templatePinEl;
  };

  // var generatePins = function () {
  //   var arrayData;
  //   var onError = function (message) {
  //     console.error(message);
  //   };
  //   var onSuccess = function (data) {
  //     debugger
  //     arrayData = data
  //     return arrayData;
  //     console.log(arrayData);
  //   }

  //   window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
  //   var templatePinEl = getTemplatePinEl();
  //   var ads = window.data.generateAds();
  //   var fragmentPin = document.createDocumentFragment();

  //   for (var k = 0; k < ads.length; k++) {
  //     fragmentPin.appendChild(addPinInfo(ads[k], templatePinEl));
  //   }

  //   return fragmentPin;
  // };
var generatePins = function () {
  window.load(function (pin) {
    var templatePinEl = getTemplatePinEl();
    var mapPinEl = window.data.getMapPinEl();
    var fragmentPin = document.createDocumentFragment();
    console.log(pin)
    for (var k = 0; k < 8; k++) {
      fragmentPin.appendChild(addPinInfo(pin[k], templatePinEl));
    }
    mapPinEl.appendChild(fragmentPin);
    return mapPinEl;

  })
}

// var addMapPin = function () {
//     var mapPinEl = window.data.getMapPinEl();
//     console.log(generatePins())
//     mapPinEl.appendChild(generatePins());
//   };

  window.pin = {
    generatePins: generatePins,
  };
})();
