'use strict';
(function () {
  var RESPONSE_TYPE = 'json';
  var URL = 'https://js.dump.academy/keksobooking/data';
  var METHOD_XHR_OPEN = 'GET';
  var CODE_REQUEST_OK = 200;
  var Errors = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    404: 'Ничего не найдено',
    500: 'Ошибка сервера',
    503: 'Сервис временно недоступен'
  };

  var loadData = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.open(METHOD_XHR_OPEN, URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_REQUEST_OK) {
        successHandler(xhr.response);
      } else {
      errorHandler(Errors[xhr.status]);
      }
    });
    xhr.send();
  };

  window.load = {
    loadData: loadData,
  };
})();
