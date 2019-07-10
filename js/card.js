(function() {
  var OFFER_TYPE_RUS = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    place: 'Дворец'

  }

  var getTemplateCardEl = function () {
    var CardEl = document.querySelector('#card')
    .content
    .querySelector('.map__card');

    return CardEl;
  };

  var addCardInfo = function (ad, template) {
    var cardElement = template.cloneNode(true);
    console.log(ad);
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = OFFER_TYPE_RUS[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до: ' + ad.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    //создаем список преимуществ
    var popupFeaturesEl = cardElement.querySelector('.popup__features');
    popupFeaturesEl.innerHTML = '';
    ad.offer.features.forEach(function (it) {
      var li = document.createElement('li');
      li.className = "popup__feature popup__feature--" + it;
      popupFeaturesEl.appendChild(li);
    });
    //создаем список фоток

    var popupPhotoBlock = cardElement.querySelector('.popup__photos');
    var popupPhoto = cardElement.querySelector('.popup__photo');
    popupPhotoBlock.innerHTML = '';

    ad.offer.photos.forEach(function(it) {
      var photoClone = popupPhoto.cloneNode(true);
      photoClone.setAttribute('src', it);
      popupPhotoBlock.appendChild(photoClone)
    });
    return cardElement;
  };

  var createFragmentCard = function (ads) {
    var fragmentCard = document.createDocumentFragment();
    var firstAds = ads.shift()
    fragmentCard.appendChild(addCardInfo(firstAds, getTemplateCardEl()));
    return fragmentCard;
  };

  var drawCard = function (ads) {
    var mapBlockEl = window.mapAction.mapBlockEl;
     var fragmentCard = createFragmentCard(ads);

    mapBlockEl.appendChild(fragmentCard);
    return mapBlockEl;
  };

  window.card = {
    drawCard: drawCard,
  };

})();
