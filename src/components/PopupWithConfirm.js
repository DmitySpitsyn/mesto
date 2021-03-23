import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        // this.confirmDeleteCard = confirmDeleteCard;
        this.button = this._popup.querySelector(".form__button-submit");
    }
    open() {
        super.open();
        console.log()
        this.button.addEventListener('click', () => console.log('ok'));
    }

}