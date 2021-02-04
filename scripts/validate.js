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


function setEventListener(popup, inputElement, formElement, inputList) {
    inputElement.addEventListener("input", function() {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, formElement);
    });
    /*  const functionKey = function(evt) {
          pressKey(evt, popup)
          document.removeEventListener("keydown", functionKey);
      };
      document.addEventListener("keydown", functionKey);
    popup.addEventListener("click", function(evt) {
        checkElementClose(evt);
    });*/
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, formElement) {

    const buttonElement = formElement.querySelector(".form__button-submit");
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("form__button-submit_inactive");
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove("form__button-submit_inactive");
        buttonElement.disabled = false;
    }
}

function enableValidation() {
    const popups = Array.from(document.querySelectorAll(".popup"));
    popups.forEach((popup) => {
        const formsElement = Array.from(document.querySelectorAll(".form"));
        formsElement.forEach((formElement) => {
            const inputList = Array.from(formElement.querySelectorAll(".form__input"));
            inputList.forEach((inputElement) => {
                toggleButtonState(inputList, formElement);
                checkInputValidity(formElement, inputElement);
                setEventListener(popup, inputElement, formElement, inputList);

            });
        });
    });
}
enableValidation()