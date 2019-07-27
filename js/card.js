'use strict';
(function () {
  var ESC_KEY_CODE = 27;
  var OfferType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    place: 'Дворец'
  };
  var templateCardEl = document.querySelector('#card').content.querySelector('.map__card');

  var createFeaturesList = function (popupFeaturesEl, ad) {
    popupFeaturesEl.innerHTML = '';
    ad.offer.features.forEach(function (it) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + it;
      popupFeaturesEl.appendChild(li);
    });
  };

  var createPhotoList = function (popupPhotoEl, ad) {
    var popupPhoto = popupPhotoEl.querySelector('.popup__photo');
    popupPhotoEl.innerHTML = '';
    ad.offer.photos.forEach(function (it) {
      var photoClone = popupPhoto.cloneNode(true);
      photoClone.setAttribute('src', it);
      popupPhotoEl.appendChild(photoClone);
    });
  };

  var escKeydownHandler = function (e) {
    if (e.keyCode === ESC_KEY_CODE) {
      document.querySelector('.map__card').remove();
      document.removeEventListener('keydown', escKeydownHandler);
    }
  };

  var removeCardBlock = function () {
    var cardBlockEl = document.querySelector('.map__card');
    if (cardBlockEl) {
      cardBlockEl.remove();
    }
  };

  var addCardInfo = function (ad, template) {
    removeCardBlock();
    var cardElement = template.cloneNode(true);
    var popupFeaturesEl = cardElement.querySelector('.popup__features');
    var popupPhotoEl = cardElement.querySelector('.popup__photos');

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = OfferType[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до: ' + ad.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;

    createFeaturesList(popupFeaturesEl, ad);
    createPhotoList(popupPhotoEl, ad);

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      document.querySelector('.map__card').remove();
    });

    document.addEventListener('keydown', escKeydownHandler);

    return cardElement;
  };

  var createFragmentElForCard = function (ads) {
    var fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(addCardInfo(ads, templateCardEl));
    return fragmentCard;
  };

  var drawCard = function (ads) {
    var mapBlockEl = window.mapAction.mapBlockEl;
    var fragmentCard = createFragmentElForCard(ads);

    mapBlockEl.appendChild(fragmentCard);
    return mapBlockEl;
  };

  window.card = {
    drawCard: drawCard,
    removeCardBlock: removeCardBlock,
  };
})();
