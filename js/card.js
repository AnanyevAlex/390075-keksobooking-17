'use strict';
(function () {
  var OFFER_TYPE_RUS = {
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

  var addCardInfo = function (ad, template) {
    var cardElement = template.cloneNode(true);
    var popupFeaturesEl = cardElement.querySelector('.popup__features');
    var popupPhotoBlock = cardElement.querySelector('.popup__photos');

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = OFFER_TYPE_RUS[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до: ' + ad.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    // создаем список преимуществ
    createFeaturesList(popupFeaturesEl, ad);
    // создаем список фоток
    createPhotoList(popupPhotoBlock, ad);

    return cardElement;
  };

  var createFragmentElForCard = function (ads) {
    var fragmentCard = document.createDocumentFragment();
    var firstAds = ads.shift();
    fragmentCard.appendChild(addCardInfo(firstAds, getTemplateCardEl()));
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
