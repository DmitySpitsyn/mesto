const inCards = [{
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

class Card {
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
        console.log(_cardElement);
        return _cardElement;
    }
    _creatCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".element__title").textContent = this._name;
        const _elementImage = this._element.querySelector(".element__image");
        _elementImage.src = this._link;
        _elementImage.alt = "Фотография места " + this._name;
        console.log("ok");
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
            //    .addEventListener("click", popupImage(this._data));
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

/*
function createCard(text) {
  
    elementImage.addEventListener("click", function() {
        popupImage(text);
    });
}*/

inCards.forEach((data) => {
    const card = new Card(data, ".section-elements");
    const cardElement = card._creatCard();

    elements.appendChild(cardElement);
});