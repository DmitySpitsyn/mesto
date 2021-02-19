import { popupImage } from './index.js';
export class Card {
    constructor(data, cardSelectror) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelectror;
        this._data = data;
    }
    _getTemplate() {
        const _cardElement = document
            .querySelector(this._cardSelector)
            .content.cloneNode(true);
        return _cardElement;
    }
    _creatCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".element__title").textContent = this._name;
        const _elementImage = this._element.querySelector(".element__image");
        _elementImage.src = this._link;
        _elementImage.alt = "Фотография места " + this._name;
        return this._element;
    }
    _setEventListeners() {
        this._element
            .querySelector(".element__delete-button")
            .addEventListener("click", this._deleteCard);
        this._element
            .querySelector(".element__like-button")
            .addEventListener("click", this._switchLikeButton);
        this._element
            .querySelector(".element__image")
            .addEventListener("click", (f) => { popupImage(this._name, this._link) });
    }

    _switchLikeButton(evt) {
        evt.target
            .closest(".element__like-button")
            .classList.toggle("element__like-button_active");
    }
    _deleteCard(evt) {
        evt.target.closest(".element").remove();
    }
}