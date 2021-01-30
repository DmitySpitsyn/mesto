function checkInputValidity(element) {

}

function isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        // showInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        // console.log(formElement, inputElement, inputElement.validationMessage);
        console.log('no valid')
    } else {
        // hideInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        // console.log(formElement, inputElement);
        console.log('valid')
    }
}

function setEventListeners(element, formElement, inputElement) {
    element.addEventListener("click", function(evt) {
        checkElementClose(evt);
    });
    document.addEventListener("keydown", function(evt) {
        pressKey(evt, element);
    });
    element.addEventListener('input', function() {
        const formElement = element.querySelector('.form')
        const inputList = Array.from(formElement.querySelectorAll('.form__input'));
        inputList.forEach((inputElement) => {

            isValid(formElement, inputElement);
        })
    });

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