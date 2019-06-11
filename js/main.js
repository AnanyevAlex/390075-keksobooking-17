'use strict';

var AVATAR_IMG_EXTENSION = '.png';
var AVATAR_IMG_SRC = 'img/avatars/user';

var getRandom = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAvatarImgSrc = function (numberAuthor) {
  return AVATAR_IMG_SRC + '0' + numberAuthor + AVATAR_IMG_EXTENSION;
};

var offerType = ['palace', 'flat', 'house', 'bungalo'];
var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');
var mapPin = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var author = [];
for (var i = 0; i < 8; i++) {

  author.push({
    avatar: getAvatarImgSrc(i + 1),
    offer: offerType[getRandom(3, 0)],
    location: {
      x: getRandom(1200, 0) - (40 / 2),
      y: getRandom(630, 130) - (70 / 2),
    }
  });
}

for (i = 0; i < author.length; i++) {
  var pinElement = templatePin.cloneNode(true);

  pinElement.style.left = author[i].location.x + 'px';
  pinElement.style.top = author[i].location.y + 'px';
  pinElement.querySelector('img').src = author[i].avatar;
  pinElement.querySelector('img').alt = author[i].offer;

  mapPin.appendChild(pinElement);
}
