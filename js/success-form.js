'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var mainEl = document.querySelector('main');
  var escKeydownHandler = function (e) {
      if (e.keyCode === ESC_KEY_CODE)  {
        mainEl.removeChild(successElement);
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };
  // success
  var successHandler = function () {

    var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    mainEl.insertAdjacentElement('afterbegin', successElement);

    var escKeydownHandler = function (e) {
      if (e.keyCode === ESC_KEY_CODE)  {
        mainEl.removeChild(successElement);
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    var areaClickHandler = function () {
      mainEl.removeChild(successElement);
      successElement.removeEventListener('click', areaClickHandler);
    };
    document.addEventListener('keydown', escKeydownHandler);
    successElement.addEventListener('click', areaClickHandler);
  };
// error
  var errorHandler = function (errorMessage) {
    var errorBlockTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorBlockElement = errorBlockTemplate.cloneNode(true);
    var error;
    mainEl.insertAdjacentElement('afterbegin', errorBlockElement);
    var errorMessageText = errorBlockElement.querySelector('.error__message');
    errorMessageText.textContent = errorMessage;

    var errorButtonEl = errorBlockElement.querySelector('.error__button');
    var errorButtonClickHandler = function () {
      location.reload();
      errorButtonEl.removeEventListener('click', errorButtonClickHandler);
    };

    var escKeydownHandler = function (e) {
      if (e.keyCode === ESC_KEY_CODE)  {
        mainEl.removeChild(errorBlockElement);
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    var areaClickHandler = function () {
      mainEl.removeChild(errorBlockElement);
      errorBlockElement.removeEventListener('click', areaClickHandler);
    };
    errorButtonEl.addEventListener('click', errorButtonClickHandler);
    document.addEventListener('keydown', escKeydownHandler);
    errorBlock.addEventListener('click', areaClickHandler);
  };


  window.successForm = {
    successHandler: successHandler,
    errorHandler: errorHandler,
  }
})();
