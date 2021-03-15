export class FormValidator {
    constructor(data, formSelector) {
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._inputSelector = data.inputSelector;
        this._formSelector = formSelector;
        this._form = document.querySelector(this._formSelector);
        this._inputs = this._form.querySelectorAll(this._inputSelector);
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    }

    enableValidation() {
        this._inputs.forEach((_input) => {
            _input.addEventListener("input", (f) => {
                this._checkInputValidity();
            });
        });
        this._form.addEventListener('reset', () => {
            this._inputs.forEach((_input) => {
                const _errorElement = this._form.querySelector(`.${_input.id}-error`);
                this._hideInputError(_input, _errorElement)
                this._toggleButtonState();
            })
        });
    }

    _checkInputValidity() {
        this._toggleButtonState();
        this._inputs.forEach((_input) => {
            const _errorElement = this._form.querySelector(`.${_input.id}-error`);
            if (!_input.validity.valid) {
                this._showInputError(_input, _errorElement);
            } else {
                this._hideInputError(_input, _errorElement);
            }
        });
    }
    _enableButtonSubmit(_buttonElement) {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;

    }
    _disableButtonSubmit(_buttonElement) {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }
    _toggleButtonState() {

        if (this._hasInvalidInput(this._inputs)) {
            this._disableButtonSubmit(this._buttonElement);
        } else {
            this._enableButtonSubmit(this._buttonElement);
        }
    }
    _hasInvalidInput(_inputs) {
        const _inputElements = Array.from(_inputs);
        return _inputElements.some((_input) => {
            return !_input.validity.valid;
        });
    }
    _showInputError(_input, _errorElement) {
        _input.classList.add(this._inputErrorClass);
        _errorElement.textContent = _input.validationMessage;
        _errorElement.classList.add(this._errorClass);
    }
    _hideInputError(_input, _errorElement) {
        _input.classList.remove(this._inputErrorClass);
        _errorElement.classList.remove(this._errorClass);
        _errorElement.textContent = "";
    }
}