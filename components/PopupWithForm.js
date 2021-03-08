import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, { submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
        this._closeEventListners();

        //    this._popupSelector.querySelector('.form').reset();
    }

    _submit(event) {
        event.preventDefault();
        let _inputs = ''
        _inputs = this._getInputValues()
        this._submitForm(_inputs);
        console.log('ok')
        this.close();
        this._popupSelector.removeEventListener("submit", this.submit);
    }

    _getInputValues() {
        let _inputs = '';
        _inputs = this._popupSelector.querySelectorAll('.form__input');
        return _inputs;
    }
    setEventListeners() {
        document.addEventListener("keydown", this._handleEscClose.bind(this));
        this._popupSelector.addEventListener(
            "click",
            this._closeByClick.bind(this)
        );
        this.submit = this._submit.bind(this);
        this._popupSelector.addEventListener("submit", this.submit);

    }
}