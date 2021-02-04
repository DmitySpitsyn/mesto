function showInputError(inputErrorClass, errorClass, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

function hideInputError(inputErrorClass, errorClass, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
}

function checkInputValidity(inputErrorClass, errorClass, formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(inputErrorClass, errorClass, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(inputErrorClass, errorClass, formElement, inputElement);
    }
}


function setEventListener(inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass, inputElement, formElement, inputList) {
    inputElement.addEventListener("input", function() {
        checkInputValidity(inputErrorClass, errorClass, formElement, inputElement);
        toggleButtonState(submitButtonSelector, inactiveButtonClass, inputList, formElement);
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(submitButtonSelector, inactiveButtonClass, inputList, formElement) {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    if (hasInvalidInput(inputList)) {
        buttonElementDisabled(buttonElement, inactiveButtonClass)
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
        formElement.onsubmit = function() {
            buttonElementDisabled(buttonElement, inactiveButtonClass)
        };
    }
}

function buttonElementDisabled(buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
}

function enableValidation(text) {
    const submitButtonSelector = text.submitButtonSelector;
    const inactiveButtonClass = text.inactiveButtonClass;
    const inputErrorClass = text.inputErrorClass;
    const errorClass = text.errorClass;
    const formsElement = Array.from(document.querySelectorAll(text.formSelector));
    formsElement.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(text.inputSelector));
        inputList.forEach((inputElement) => {
            setEventListener(inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass, inputElement, formElement, inputList);
        });
    });
}

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-submit',
    inactiveButtonClass: 'form__button-submit_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
})