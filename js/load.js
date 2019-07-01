'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };


  // window.load = function (onSuccess, onError) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';
  //   xhr.addEventListener('load', function () {
  //     var error;
  //     switch (xhr.status) {
  //       case 200:
  //         onSuccess(xhr.response);
  //         break;

  //       case 400:
  //         error = 'Неверный запрос';
  //         break
  //       case 401:
  //         error = 'Пользователь не авторизован';
  //         break
  //       case 404:
  //         error = 'Ничего не найдено';
  //         break

  //       default:
  //         error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
  //     };
  //     if (error) {
  //       onError(error);
  //     };
  //   });

  //   xhr.addEventListener('error', function () {
  //     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  //   });
  //   xhr.timeout = 3000; //3 секунды
  //   xhr.open('GET', URL)
  //   xhr.send();
  // }
})();
// (function () {
//   var onError = function (message) {
//     console.error(message);
//   };
//   var onSuccess = function (data) {
//     var ads = data;
//     console.log(ads);
//   }
//   window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
// });

    // console.log(array);
    // console.log(array[1].author.avatar)
    // console.log(array[1].location.x)
    // console.log(array[1].location.y)
    // console.log(array[1].offer.type)
