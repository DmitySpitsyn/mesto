import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector, { deleteCard }) {
        super(popupSelector);
        this.deleteCard = deleteCard;
        this.button = this._popup.querySelector(".form__button-submit");
        this.deleteThisCard = this.deleteThisCard.bind(this);
        this.cardId = '';
        this.element = '';
    }
    open(cardId, element) {
        super.open();
        super.setEventListeners();
        this.button.addEventListener('click', this.deleteThisCard);
        this.cardId = cardId;
        this.element = element;

    }


    deleteThisCard() {
        //this.api.deleteCard(cardId)
        this.close();
        this.deleteCard(this.cardId, this.element);
        this.button.removeEventListener('click', this.deleteThisCard);

    }
}