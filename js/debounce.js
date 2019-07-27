'use strict';
(function () {
  var DEBOUNCE_TIMEOUT = 500;
  var lastTimeout = null;

  var debounce = function (cb) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(cb, DEBOUNCE_TIMEOUT);
  };

  window.debounce = {
    debounce: debounce,
  };
})();
