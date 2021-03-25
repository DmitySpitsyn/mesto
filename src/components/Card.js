export class Card {
    constructor(data, username, { confirmDeleteCard, checkLike }, { handleCardClick }, cardSelectror) {
        this._placename = data.name;
        this._placelink = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelectror;
        this._likes = data.likes;
        this._name = data.owner.name;
        this._about = data.owner.about;
        this._confirmDeleteCard = confirmDeleteCard;
        this._cardId = data._id;
        this._checkLike = checkLike;
        this._username = username;

    }

    _getTemplate() {
        const _cardElement = document
            .querySelector(this._cardSelector)
            .content.cloneNode(true);
        return _cardElement;
    }

    _deleteButtonStatus() {
        if (this._username.name === this._name && this._username.about === this._about) {
            const button = this._element.querySelector(".element__delete-button");
            button.classList.add('element__delete-button_active');
            button.id = this._cardId;
        }

    }

    _likeButtonStatus() {
        this._likes.forEach(item => {
            if (item.name === this._username.name && item.about === this._username.about) {
                this._element.querySelector(".element__like-button").classList.add("element__like-button_active");
            }
        });
    }
    createCard() {
        this._element = this._getTemplate();
        this._deleteButtonStatus();
        this._likeButtonStatus();
        this._setEventListeners();
        this._element.querySelector(".element__title").textContent = this._placename;
        const _elementImage = this._element.querySelector(".element__image");
        _elementImage.src = this._placelink;
        _elementImage.alt = "Фотография места " + this._placename;
        const _likeCounter = this._element.querySelector(".element__counter-like");
        _likeCounter.textContent = this._likes.length;
        _likeCounter.id = this._cardId;

        return this._element;
    }

    _setEventListeners() {
        this._element
            .querySelector(".element__delete-button")
            .addEventListener("click", this._confirmDelete.bind(this));
        this._element
            .querySelector(".element__like-button")
            .addEventListener("click", this._switchLikeButton.bind(this));
        this._element
            .querySelector(".element__image")
            .addEventListener("click", () => {
                this._handleCardClick(this._placename, this._placelink);
            });
    }
    _switchLikeButton(evt) {
        evt.target
            .classList.toggle("element__like-button_active");
        const _likeCounter = evt.target.closest(".element").querySelector(".element__counter-like");
        let _counter = Number(_likeCounter.textContent);
        this._checkLike(evt, _counter, _likeCounter);
    }


    _confirmDelete(evt) {
        const cardId = evt.target.id;
        this._confirmDeleteCard(cardId);
    }

}