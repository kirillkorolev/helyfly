"use strict";

(function() {
  var contacts = document.querySelector(".contacts");
  var photosBlock = document.querySelector(".photos");
  var aboutUsBlock = document.querySelector(".about-us");
  var reviewsBlock = document.querySelector(".reviews");

  var nextButton = contacts.querySelector(".contacts__arrow-button--next");
  var previousButton = contacts.querySelector(
    ".contacts__arrow-button--previous"
  );

  var morePicturesButton = photosBlock.querySelector(".js-show-more-pictures");
  var hiddenPictures = photosBlock.querySelectorAll(".photos__item--hidden");
  var photosList = photosBlock.querySelector(".photos__list");

  var moreDescriptionButton = aboutUsBlock.querySelector(
    ".js-about-us-more-description-button"
  );
  var moreServiceInfoButton = aboutUsBlock.querySelector(
    ".js-about-us-more-service-info-button"
  );
  var moreAuthorInfoButton = aboutUsBlock.querySelector(
    ".js-about-us-more-author-info-button"
  );
  var moreAuthorConactsInfoButton = contacts.querySelector(
    ".js-contacts-more-author-info-button"
  );

  var openModalButton = document.querySelector(".js-open-modal");
  var blackout = document.querySelector(".blackout");
  var modalForm = document.querySelector(".modal");
  var ESC_KEYCODE = 27;
  var closeModalButton = modalForm.querySelector(".js-close-modal-button");

  var hiddenReviews = reviewsBlock.querySelectorAll(".reviews__item--hidden");
  var hiddenReviewsAmmount = reviewsBlock.querySelector(
    ".reviews__comments-ammount"
  );
  var showReviewsButton = reviewsBlock.querySelector(".js-show-more-reviews");

  var errors = {
    nodate: "не выбрна дата",
    noemail: "не заполнен email",
    noname: "не заполнено имя",
    nosurname: "не заполнено фамилия",
    nophone: "не заполнен телефон",
    nocardnumber: "не заполнен номер карты",
    nocardterm: "не заполнен срок действия карты",
    nocardcvv: "не введен cvv карты",
    noconfirmation: "подтвердите согласие"
  };

  var submitButton = modalForm.querySelector(".js-modal-submit");
  var inputDate = modalForm.querySelector(".form__item--date .form__input");
  var inputEmail = modalForm.querySelector(".form__item--email .form__input");
  var inputName = modalForm.querySelector(".form__item--name .form__input");
  var inputSurname = modalForm.querySelector(
    ".form__item--surname .form__input"
  );
  var inputPhone = modalForm.querySelector(".form__item--phone .form__input");
  var inputCardNumber = modalForm.querySelector(
    ".form__item--card-number .form__input"
  );
  var inputCardValidity = modalForm.querySelector(
    ".form__item--validity .form__input"
  );
  var checkbox = modalForm.querySelector(".form__checkbox-input");
  var mapPointButton = contacts.querySelector(".js-contacts-map-point");
  var closeMeassgeButton = contacts.querySelector(".js-contacts-close-message");
  var contactsMessage = contacts.querySelector(".contacts__message");

  var descriptionBlock = document.querySelector(".description");
  var videoField = descriptionBlock.querySelector(".description__video-wrap");
  var videoPlayButton = descriptionBlock.querySelector(".js-play-video-button");
  var video = descriptionBlock.querySelector(".description__video");

  mapPointButton.addEventListener("click", function() {
    if (contactsMessage.classList.contains("contacts__message--hidden")) {
      contactsMessage.classList.remove("contacts__message--hidden");
    } else {
      contactsMessage.classList.add("contacts__message--hidden");
    }
  });

  closeMeassgeButton.addEventListener("click", function() {
    contactsMessage.classList.add("contacts__message--hidden");
  });

  var resetForm = function() {
    inputDate.value = "";
    inputDate.setCustomValidity = "";
    inputEmail.value = "";
    inputEmail.setCustomValidity = "";
    inputName.value = "";
    inputName.setCustomValidity = "";
    inputSurname.value = "";
    inputSurname.setCustomValidity = "";
    inputPhone.value = "";
    inputPhone.setCustomValidity = "";
    inputCardNumber.value = "";
    inputCardNumber.setCustomValidity = "";
    inputCardValidity.value = "";
    inputCardValidity.setCustomValidity = "";

    checkbox.checked = false;

    var errorInputs = modalForm.querySelectorAll(".form__input--error");
    errorInputs.forEach(function(error) {
      error.classList.remove("form__input--error");
    });
  };

  var showHiddenText = function(
    parent,
    hiddenTextClass,
    button,
    hiddenButtonClass
  ) {
    var text = parent.querySelector("." + hiddenTextClass);

    text.classList.remove(hiddenTextClass);
    button.classList.add(hiddenButtonClass);
  };

  moreDescriptionButton.addEventListener("click", function() {
    showHiddenText(
      aboutUsBlock,
      "about-us__author-description--hidden",
      moreDescriptionButton,
      "about-us__more-text-button--hidden"
    );
  });

  moreServiceInfoButton.addEventListener("click", function() {
    showHiddenText(
      aboutUsBlock,
      "about-us__service-description--hidden",
      moreServiceInfoButton,
      "about-us__more-text-button--hidden"
    );
  });

  moreAuthorInfoButton.addEventListener("click", function() {
    showHiddenText(
      aboutUsBlock,
      "about-us__author-personal-info--hidden",
      moreAuthorInfoButton,
      "about-us__more-author-info--hidden"
    );
  });

  moreAuthorConactsInfoButton.addEventListener("click", function() {
    showHiddenText(
      contacts,
      "contacts__work-text--hidden",
      moreAuthorConactsInfoButton,
      "contacts__info-button--hidden"
    );
  });

  morePicturesButton.addEventListener("click", function() {
    hiddenPictures.forEach(function(picture) {
      picture.classList.remove("photos__item--hidden");
    });
    photosList.style.marginBottom = "0px";
    morePicturesButton.classList.add("photos__button--hidden");
  });

  var slides = contacts.querySelectorAll(".contacts__item");
  var dots = contacts.querySelectorAll(".contacts__dot-item");
  var currentSlide = 0;

  var showSlides = function(n) {
    slides[currentSlide].classList.remove("contacts__item--showing-slide");
    dots[currentSlide].classList.remove("contacts__dot-item--active");
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("contacts__item--showing-slide");
    dots[currentSlide].classList.add("contacts__dot-item--active");
  };

  previousButton.addEventListener("click", function() {
    showSlides(currentSlide - 1);
  });

  nextButton.addEventListener("click", function() {
    showSlides(currentSlide + 1);
  });

  var dotsBlock = contacts.querySelector(".contacts__dots-list");
  dotsBlock.addEventListener("click", function(evt) {
    var activeDot = dotsBlock.querySelector(".contacts__dot-item--active");

    var target = evt.target;
    if (
      !target.classList.contains("contacts__dot-item--active") &&
      target.classList.contains("contacts__dot-item")
    ) {
      var id = target.id.slice(4);
      activeDot.classList.remove("contacts__dot-item--active");
      dots[id - 1].classList.add("contacts__dot-item--active");
      showSlides(id - 1);
    }
  });

  var removeHiddenClass = function(modal, visibleClass) {
    modal.classList.remove(visibleClass);
  };

  var openModal = function(
    modal,
    hiddenClass,
    visibleClass,
    onEscFunction,
    onClickFunction
  ) {
    modal.classList.remove(hiddenClass);
    modal.classList.add(visibleClass);
    blackout.classList.remove("blackout--none");
    document.addEventListener("keydown", onEscFunction);
    blackout.addEventListener("click", onClickFunction);
  };

  var closeModal = function() {
    removeHiddenClass(modalForm, "modal--visible");
    modalForm.classList.add("modal--hidden");
    blackout.classList.add("blackout--none");
    document.removeEventListener("keydown", onMessageEscPress);
    blackout.removeEventListener("click", closeModalOnButtonClick);
    resetForm();
  };

  var onMessageEscPress = function(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal();
    }
  };

  var closeModalOnButtonClick = function() {
    blackout.addEventListener("click", closeModal());
  };

  openModalButton.addEventListener("click", function() {
    openModal(
      modalForm,
      "modal--hidden",
      "modal--visible",
      onMessageEscPress,
      closeModalOnButtonClick
    );
  });

  closeModalButton.addEventListener("click", function() {
    closeModal();
  });

  var validateFilling = function(input, errorType) {
    var filling = input.value;

    if (!filling) {
      input.setCustomValidity(errorType);
      input.classList.add("form__input--error");
      return false;
    } else {
      input.setCustomValidity("");
      if (input.classList.contains("form__input--error")) {
        input.classList.remove("form__input--error");
      }
      return true;
    }
  };

  var validatePhone = function(input, errorType) {
    var phone = input.value;
    var regEx = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    if (regEx.test(phone) === false) {
      input.setCustomValidity(errorType);
      input.classList.add("form__input--error");
      return false;
    } else {
      input.setCustomValidity("");
      if (input.classList.contains("form__input--error")) {
        input.classList.remove("form__input--error");
      }
      return true;
    }
  };

  var validateEmail = function(input, errorType) {
    var mail = input.value;
    var regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (regEx.test(mail) === false) {
      input.setCustomValidity(errorType);
      input.classList.add("form__input--error");
      return false;
    } else {
      input.setCustomValidity("");
      input.classList.remove("form__input--error");
      return true;
    }
  };

  var validateCheckbox = function(input, errorType) {
    if (input.checked === false) {
      input.setCustomValidity(errorType);
      input.classList.add("form__checkbox-input--error");
      return false;
    } else {
      input.setCustomValidity("");
      if (input.classList.contains("form__checkbox-input--error")) {
        input.classList.remove("form__checkbox-input--error");
      }
      return true;
    }
  };

  submitButton.addEventListener("click", function(evt) {
    if (
      validateFilling(inputDate, errors.nodate) &&
      validateEmail(inputEmail, errors.noemail) &&
      validateFilling(inputName, errors.noname) &&
      validateFilling(inputSurname, errors.nosurname) &&
      validatePhone(inputPhone, errors.nophone) &&
      validateFilling(inputCardNumber, errors.nocardnumber) &&
      validateFilling(inputCardValidity, errors.nocardterm) &&
      validateCheckbox(checkbox, errors.noconfirmation)
    ) {
      evt.preventDefault();
      closeModal();
      resetForm();
    }
  });

  var setHiddenReviewsAmmount = function() {
    var sum = hiddenReviews.length;

    hiddenReviewsAmmount.textContent = "(" + sum + ")";
  };

  setHiddenReviewsAmmount();

  showReviewsButton.addEventListener("click", function() {
    hiddenReviews.forEach(function(review) {
      if (review.classList.contains("reviews__item--hidden")) {
        review.classList.remove("reviews__item--hidden");
      }
      showReviewsButton.classList.add("reviews__button--hidden");
    });
  });

  videoField.addEventListener("click", function() {
    videoPlayButton.classList.add("description__video-play--hidden");
    video.classList.add("description__video--hidden");
  });
})();
