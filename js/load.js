'use strict';
(function () {
  var RESPONSE_TYPE = 'json';
  var LOAD_DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SEND_DATA_URL = 'https://js.dump.academy/keksobooking';
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

    xhr.open(METHOD_XHR_OPEN, LOAD_DATA_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_REQUEST_OK) {
        successHandler(xhr.response);
      } else {
        errorHandler(Errors[xhr.status]);
      }
    });
    xhr.send();
  };

  var sendData = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_REQUEST_OK) {
        successHandler(xhr.response);
      } else {
        errorHandler(Errors[xhr.status]);
      }
    });
    xhr.open('POST', SEND_DATA_URL);
    xhr.send(data);
  };

  window.load = {
    loadData: loadData,
    sendData: sendData,
  };
})();
