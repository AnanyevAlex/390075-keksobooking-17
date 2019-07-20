'use strict';
(function () {
  var shuffle = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var adsArr = [];
  var successHandler = function (ads) {
    adsArr = shuffle(ads);
    window.pin.drawPins(adsArr);
    window.filter.setAdsArr(ads);
  };

  var loadData = function () {
    window.load.loadData(successHandler, window.successForm.errorHandler);
  };

  window.data = {
    loadData: loadData,
  };
})();
