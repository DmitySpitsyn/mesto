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
        this._removeEventListners();
    }
    _removeEventListners() {
        document.removeEventListener("keydown", this._handleEscCloseConst);
        this._popupSelector.removeEventListener("click", this._closeByClickConst);
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    _closeByClick(evt) {
        if (
            evt.target.classList.contains("container__button-close") ||
            evt.target.classList.contains("popup")
        ) {
            this.close();
        }
    }

    setEventListeners() {

        this._handleEscCloseConst = this._handleEscClose.bind(this);
        document.addEventListener("keydown", this._handleEscCloseConst);

        this._closeByClickConst = this._closeByClick.bind(this);
        this._popupSelector.addEventListener("click", this._closeByClickConst);
    }
}