function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

function setEventListeners(element) {
    const formElement = element.querySelector(".form");
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));
    toggleButtonState(inputList, formElement);
    element.addEventListener("click", function(evt) {
        checkElementClose(evt);
    });
    document.addEventListener("keydown", function(evt) {
        pressKey(evt, element);
    });

    element.addEventListener("input", function() {
        inputList.forEach((inputElement) => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, formElement);
        });
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, formElement) {
    console.log("ok");
    const buttonElement = formElement.querySelector(".form__button-submit");
    if (hasInvalidInput(inputList)) {
        console.log("no");
        buttonElement.classList.add("form__button-submit_inactive");
        buttonElement.disabled = true;
    } else {
        console.log("yes");
        buttonElement.classList.remove("form__button-submit_inactive");
        buttonElement.disabled = false;
    }
}

function checkElementClose(evt) {
    if (
        evt.target.classList.contains("container__button-close") ||
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("form__button-submit")
    ) {
        closePopup(evt.target);
    }
}

function pressKey(evt, element) {
    if (evt.key === "Escape") {
        closePopup(element);
    }
}