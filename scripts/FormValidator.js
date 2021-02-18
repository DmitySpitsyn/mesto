const validationSetting = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button-submit",
    inactiveButtonClass: "form__button-submit_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
};

class FormValidator {
    constructor(data, formSelector) {
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._inputSelector = data.inputSelector;
        this._formSelector = formSelector;
    }

    _setEventListner() {
        const _form = document.querySelector(this._formSelector);
        const _inputs = _form.querySelectorAll(this._inputSelector);
        //    console.log(this._inputSelector)
        //    console.log(_inputs);
        _inputs.forEach((_input) => {
            _input.addEventListener("input", (f) => {
                this._checkInputValidity();
            });
            //   _toggleButtonState( /*submitButtonSelector, inactiveButtonClass, inputList, formElement*/ );
        });
    }
    _checkInputValidity() {
        // this._toggleButtonState();
        //  console.log(this._inputSelector)
        //  console.log(`${this._inputSelector}-error`);
        const _form = document.querySelector(this._formSelector);
        const _inputs = _form.querySelectorAll(this._inputSelector);
        const _errorElements = document.querySelectorAll(
            `${this._inputSelector}-error`
        );
        _inputs.forEach((_input) => {
            _errorElements.forEach((_errorElement) => {
                //     console.log(_errorElement);
                if (!_input.validity.valid) {
                    console.log(this._inputErrorClass);

                    _input.classList.add(this._inputErrorClass);
                    _errorElement.textContent = _input.validationMessage;
                    _errorElement.classList.add(this._errorClass);
                    // showInputError(inputErrorClass, errorClass, formElement, inputElement, inputElement.validationMessage);
                } else {
                    console.log("yes");
                    _input.classList.remove(this._inputErrorClass);
                    _errorElement.classList.remove(this._errorClass);
                    _errorElement.textContent = "";
                    //  hideInputError(inputErrorClass, errorClass, formElement, inputElement);
                }
            });
        });
    }
}
const validation = new FormValidator(validationSetting, ".form-profile");
const formValidator = validation._setEventListner();

//function enableValidation(text) {
//  const submitButtonSelector = text.submitButtonSelector;
// const inactiveButtonClass = text.inactiveButtonClass;
// const inputErrorClass = text.inputErrorClass;
//  const errorClass = text.errorClass;
//  const formsElement = Array.from(document.querySelectorAll(text.formSelector));
//  formsElement.forEach((formElement) => {
//    const inputList = Array.from(formElement.querySelectorAll(text.inputSelector));
//   inputList.forEach((inputElement) => {
//          setEventListener(inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass, inputElement, formElement, inputList);
//     });
//});
//}