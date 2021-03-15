import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, { submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._inputList = this._popup.querySelectorAll(".form__input");
        this._submitConst = this._submit.bind(this);

    }

    close() {
        super.close();
        this._popup.querySelector(".form").reset();
    }

    _submit(event) {
            console.log('ok')
            event.preventDefault();

            const _inputs = this._getInputValues();
            console.log(_inputs)
            this._submitForm(_inputs);
            this.close();
        }
        /*   _removeEventListners() {
               super._removeEventListners();
               this._popup.removeEventListener("submit", this._submitConst);
           }*/
    _getInputValues() {
        //   const _inputList = this._popup.querySelectorAll(".form__input");
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        //  this._popup.addEventListener("click", this._handleOverlayCloseConst);
        this._popup.addEventListener("submit", this._submitConst);
    }
}