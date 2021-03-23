export class Card {
    constructor(data, { handleCardClick, confirmDeleteCard }, cardSelectror) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelectror;
        this.likes = data.likes;
        this.confirmDeleteCard = confirmDeleteCard.bind(this);

    }
    _getTemplate() {
        const _cardElement = document
            .querySelector(this._cardSelector)
            .content.cloneNode(true);
        return _cardElement;
    }
    createCard() {
        console.log(this.likes)
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".element__title").textContent = this._name;
        const _elementImage = this._element.querySelector(".element__image");
        _elementImage.src = this._link;
        _elementImage.alt = "Фотография места " + this._name;
        const _likeCounter = this._element.querySelector(".element__counter-like");
        _likeCounter.textContent = this.likes.length;

        return this._element;
    }

    _setEventListeners() {
        this._element
            .querySelector(".element__delete-button")
            .addEventListener("click", this._deleteCard.bind(this));
        this._element
            .querySelector(".element__like-button")
            .addEventListener("click", this._switchLikeButton);
        this._element
            .querySelector(".element__image")
            .addEventListener("click", () => {
                this._handleCardClick(this._name, this._link)
            });
    }
    _switchLikeButton(evt) {
        evt.target
            .closest(".element__like-button")
            .classList.toggle("element__like-button_active");
    }


    _deleteCard(evt) {

        this.confirmDeleteCard(evt);


    }




}