export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscCloseConst = this._handleEscClose.bind(this);
        this._handleOverlayCloseConst = this._handleOverlayClose.bind(this);
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscCloseConst);
    }
    close() {
        this._popup.classList.remove("popup_opened");
        this._popup.removeEventListener("keydown", this._handleEscCloseConst);
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    _handleOverlayClose(evt) {
        if (
            evt.target.classList.contains("container__button-close") ||
            evt.target.classList.contains("popup")
        ) {
            this.close();
        }
    }

    setEventListeners() {

        this._popup.addEventListener("click", this._handleOverlayCloseConst);

    }
}