import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, { submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    close() {
        super.close();
        this._popupSelector.querySelector(".form").reset();
    }

    _submit(event) {
        event.preventDefault();
        const _inputs = this._getInputValues();
        this._submitForm(_inputs);
        this.close();
    }
    _removeEventListners() {
        super._removeEventListners();
        this._popupSelector.removeEventListener("submit", this._submitConst);
    }
    _getInputValues() {
        const _inputs = this._popupSelector.querySelectorAll(".form__input");
        return _inputs;
    }
    setEventListeners() {
        super.setEventListeners();
        this._submitConst = this._submit.bind(this);
        this._popupSelector.addEventListener("submit", this._submitConst);
    }
}