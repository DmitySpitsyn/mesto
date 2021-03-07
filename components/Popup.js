//import { closeByClick } from "../scripts/index.js";
export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add("popup_opened");
        this.setEventListeners();
    }
    close() {
        this._popupSelector.classList.remove("popup_opened");
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    _closeByClick(evt) {
        if (
            evt.target.classList.contains("container__button-close") ||
            evt.target.classList.contains("popup") ||
            evt.target.classList.contains("form__button-submit")
        ) {
            console.log("yess");
            this.close();
        }
    }

    setEventListeners() {
        document.addEventListener("keydown", this._handleEscClose.bind(this));
        this._popupSelector.addEventListener(
            "click",
            this._closeByClick.bind(this)
        );
    }
}