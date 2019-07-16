'use strict';
(function () {
  var ESC_KEY_CODE = 27;
  var OfferType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    place: 'Дворец'

  };


  var getTemplateCardEl = function () {
    var templateCardEl = document.querySelector('#card')
    .content
    .querySelector('.map__card');

    return templateCardEl;
  };

  var createFeaturesList = function (popupFeaturesEl, ad) {
    popupFeaturesEl.innerHTML = '';
    ad.offer.features.forEach(function (it) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + it;
      popupFeaturesEl.appendChild(li);
    });
  };

  var createPhotoList = function (popupPhotoBlock, ad) {
    var popupPhoto = popupPhotoBlock.querySelector('.popup__photo');
    popupPhotoBlock.innerHTML = '';
    ad.offer.photos.forEach(function (it) {
      var photoClone = popupPhoto.cloneNode(true);
      photoClone.setAttribute('src', it);
      popupPhotoBlock.appendChild(photoClone);
    });
  };

  var onEscKeydown = function (e) {
    if (e.keyCode === ESC_KEY_CODE) {
      document.querySelector('.map__card').remove();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  var addCardInfo = function (ad, template) {
    var cardBlockEl = document.querySelector('.map__card');
    if (cardBlockEl) {
      cardBlockEl.remove();
    }

    var cardElement = template.cloneNode(true);
    var popupFeaturesEl = cardElement.querySelector('.popup__features');
    var popupPhotoBlock = cardElement.querySelector('.popup__photos');

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = OfferType[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до: ' + ad.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;

    createFeaturesList(popupFeaturesEl, ad);
    createPhotoList(popupPhotoBlock, ad);

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      document.querySelector('.map__card').remove();
    });

    document.addEventListener('keydown', onEscKeydown);

    return cardElement;
  };

  var createFragmentElForCard = function (ads) {
    var fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(addCardInfo(ads, getTemplateCardEl()));
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
  };

})();
