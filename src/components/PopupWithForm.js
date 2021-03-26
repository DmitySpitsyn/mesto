import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, { submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._inputList = this._popup.querySelectorAll(".form__input");
        this._submitConst = this._submit.bind(this);
        this._submitButton = this._popup.querySelector(".form__button-submit");

    }
    open() {
        super.open();
        //   this._inputList.forEach(input => input.value = '');
    }
    close() {
        super.close();
        this._popup.querySelector(".form").reset();
    }

    _submit(event) {
        event.preventDefault();
        const _inputs = this._getInputValues();
        this._submitForm(_inputs);

    }

    loading(label) {
        this._submitButton.innerText = label;
    }


    _getInputValues() {

        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", this._submitConst);
    }
}