import { userSelectors } from "../utils/constants";

export class Card {
    constructor(data, { userinfo, confirmDeleteCard, api }, { handleCardClick }, cardSelectror) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelectror;
        this.likes = data.likes;
        this.name = data.owner.name;
        this.about = data.owner.about;
        this.confirmDeleteCard = confirmDeleteCard;
        this.userinfo = userinfo;
        this.cardId = data._id;
        this.api = api;
        this.username = this.userinfo.getUserInfo();

    }

    _getTemplate() {
        const _cardElement = document
            .querySelector(this._cardSelector)
            .content.cloneNode(true);
        return _cardElement;
    }

    _deleteButtonStatus() {

        if (this.username[0] === this.name && this.username[1] === this.about) {
            const button = this._element.querySelector(".element__delete-button");
            button.classList.add('element__delete-button_active');
            button.id = this.cardId;
        }

    }

    _likeButtonStatus() {
        this.likes.forEach(item => {
            if (item.name === this.username[0] && item.about === this.username[1]) {
                this._element.querySelector(".element__like-button").classList.add("element__like-button_active");
            }
        });
    }
    createCard() {
        this._element = this._getTemplate();
        this._deleteButtonStatus();
        this._likeButtonStatus();
        this._setEventListeners();
        this._element.querySelector(".element__title").textContent = this._name;
        const _elementImage = this._element.querySelector(".element__image");
        _elementImage.src = this._link;
        _elementImage.alt = "Фотография места " + this._name;
        const _likeCounter = this._element.querySelector(".element__counter-like");
        _likeCounter.textContent = this.likes.length;
        _likeCounter.id = this.cardId;

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
                this._handleCardClick(this._name, this._link)
            });
    }
    _switchLikeButton(evt) {
        evt.target
            .classList.toggle("element__like-button_active");
        const _likeCounter = evt.target.closest(".element").querySelector(".element__counter-like");
        let counter = Number(_likeCounter.textContent);
        if (evt.target.classList.contains("element__like-button_active")) {
            this.api.addLike(_likeCounter.id).then(() => {
                counter += 1;
                _likeCounter.textContent = counter;
            })

        } else {
            this.api.deleteLike(_likeCounter.id).then(() => {
                counter -= 1;
                _likeCounter.textContent = counter;
            });
        }
    }


    _confirmDelete(evt) {
        const cardId = evt.target.id;
        const element = evt.target;
        this.confirmDeleteCard(cardId, element);
    }

}