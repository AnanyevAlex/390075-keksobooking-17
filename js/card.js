(function() {

  var getCardEl = function () {
    var CardEl = document.querySelector('#card')
    .content
    .querySelector('.map__card');

    return CardEl;
  };

  var createFragmentCard = function (ads) {
    var fragmentCard = document.createDocumentFragment();
  }

  var drawCard = function (ads) {
    var mapBlockEl = window.mapAction.mapBlockEl;
    var fragmentPin = createFragmentPin(ads);

    mapBlockEl.appendChild(fragmentPin);
    return mapBlockEl;
  };

  window.card = {
    drawCard: drawCard
  }
})();
