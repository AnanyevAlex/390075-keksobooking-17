'use strict';
(function () {
  var avatarAddEl = document.querySelector('.ad-form-header__input');
  var avatarPreviewEl = document.querySelector('.ad-form-header__preview > img');
  var headerDropZoneEl = document.querySelector('.ad-form-header__drop-zone');
  var photosDropZoneEl = document.querySelector('.ad-form__drop-zone');
  var photosAddEl = document.querySelector('.ad-form__input');
  var photosPreviewEl = document.querySelector('.ad-form__photo');
  var photosContainerEl = document.querySelector('.ad-form__photo-container');
  var FileTypes = ['gif', 'jpg', 'jpeg', 'png'];

  var matchesFileType = function (file) {
    var matches = FileTypes.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
    return matches;
  };

  var addPhoto = function (address) {
    var propertyPhoto = document.createElement('img');
    propertyPhoto.src = address;
    propertyPhoto.width = '70';
    propertyPhoto.height = '70';
    if (document.querySelector('.ad-form__photo > img')) {
      var moreDiv = photosPreviewEl.cloneNode(false);
      photosContainerEl.appendChild(moreDiv);
      moreDiv.appendChild(propertyPhoto);
    } else {
      photosPreviewEl.appendChild(propertyPhoto);
    }
  };

  avatarAddEl.addEventListener('change', function () {
    var file = avatarAddEl.files[0];
    if (matchesFileType(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewEl.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photosAddEl.addEventListener('change', function () {
    var file = photosAddEl.files[0];

    if (matchesFileType(file) === true) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        addPhoto(reader.result);
      });

      reader.readAsDataURL(file);
    }
  });

  headerDropZoneEl.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  headerDropZoneEl.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];

    if (matchesFileType(file) === true) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewEl.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }, false);

  photosDropZoneEl.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  photosDropZoneEl.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];

    if (matchesFileType(file) === true) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        addPhoto(reader.result);
      });
      reader.readAsDataURL(file);
    }
  }, false);
})();
