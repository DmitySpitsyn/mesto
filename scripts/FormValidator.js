class FormValidator {
    constructor(data, formSelector) {
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._inputSelector = data.inputSelector;
        this._formSelector = formSelector;
    }

    enableValidation() {
        const _form = document.querySelector(this._formSelector);
        const _inputs = _form.querySelectorAll(this._inputSelector);
        this._checkInputValidity(_form, _inputs);
        this._setEventListner(_form, _inputs);
    }

    _setEventListner(_form, _inputs) {
        _inputs.forEach((_input) => {
            _input.addEventListener("input", (f) => {
                this._checkInputValidity(_form, _inputs);
            });
        });
    }

    _checkInputValidity(_form, _inputs) {
        this._toggleButtonState(_form, _inputs);
        _inputs.forEach((_input) => {
            const _errorElement = _form.querySelector(`.${_input.id}-error`);
            if (!_input.validity.valid) {
                this._showInputError(_input, _errorElement);
            } else {
                this._hideInputError(_input, _errorElement);
            }
        });
    }
    _enableButtonSubmit(_form, _buttonElement) {
        _buttonElement.classList.remove(this._inactiveButtonClass);
        _buttonElement.disabled = false;

    }
    _disableButtonSubmit(_buttonElement) {
        _buttonElement.classList.add(this._inactiveButtonClass);
        _buttonElement.disabled = true;
    }
    _toggleButtonState(_form, _inputs) {
        const _buttonElement = _form.querySelector(this._submitButtonSelector);
        if (this._hasInvalidInput(_inputs)) {
            this._disableButtonSubmit(_buttonElement);
        } else {
            this._enableButtonSubmit(_form, _buttonElement);
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

export class FormProfile extends FormValidator {
    constructor(data, formSelector) {
        super(data, formSelector)
    }
}
export class FormAddElement extends FormValidator {
    constructor(data, formSelector) {
        super(data, formSelector)
    }
}