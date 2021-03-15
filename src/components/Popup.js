export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscCloseConst = this._handleEscClose.bind(this);
        this._handleOverlayCloseConst = this._handleOverlayClose.bind(this);
    }

    open() {
        this._popup.classList.add("popup_opened");
        //  this.setEventListeners();
    }
    close() {
            this._popup.classList.remove("popup_opened");
            this._popup.removeEventListener('click', this._handleOverlayClose);
            //      this._removeEventListners();
        }
        /*   _removeEventListners() {
               document.removeEventListener("keydown", this._handleEscCloseConst);
               this._popup.removeEventListener("click", this._closeByClickConst);
           }*/
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
        //    this._handleEscCloseConst = this._handleEscClose.bind(this);
        document.addEventListener("keydown", this._handleEscCloseConst);
        this._popup.addEventListener("click", this._handleOverlayCloseConst);
        //      this._closeByClickConst = this._closeByClick.bind(this);

    }
}