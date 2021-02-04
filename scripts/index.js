const initialCards = [{
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
const content = document.querySelector(".content");
const sectionElements = document.querySelector(".section-elements").content;
const elements = document.querySelector(".elements");
const addElement = document.querySelector(".profile__add-button");
const formtitle = document.querySelector(".container__title");
const profilePopup = content.querySelector(".popup-profile");
const cardPopup = content.querySelector(".popup-card-create");
const previewPopup = content.querySelector(".popup-preview");
const image = content.querySelector(".container__image");
const caption = content.querySelector(".container__caption");
const editbutton = content.querySelector(".profile__edit-button");
const formProfile = content.querySelector(".form-profile");
const formElement = content.querySelector(".form-add-element");
const profiletitle = content.querySelector(".profile__title");
const profilesubtitle = content.querySelector(".profile__subtitle");
const formName = content.querySelector(".form__input_type_name");
const formdescription = content.querySelector(".form__input_type_description");
const formPlace = content.querySelector(".form__input_type_place-name");
const formLink = content.querySelector(".form__input_type_place-link");
const closeFormProfile = content.querySelector(".popup-profile__button-close");
const closeFormCard = content.querySelector(".popup-card-create__button-close");
const closePreview = content.querySelector(".popup-preview__button-close");
const submitButtonProfile = content.querySelector(".form-profile__button-submit");
const submitButtonCard = content.querySelector(".form-add-element__button-submit");


editbutton.addEventListener("click", openFormProfile);
addElement.addEventListener("click", openFormItem);
formProfile.addEventListener("submit", submitFormProfile);
formElement.addEventListener("submit", submitFormElement);

render();

function render() {
    initialCards.forEach(renderItem);
}


function renderItem(text) {
    const item = createCard(text)
    elements.appendChild(item);
    /*  htmlElement.querySelector(".element__image").src = text.link;
      htmlElement.querySelector(".element__title").textContent = text.name;
      /*  htmlElement
            .querySelector(".element__like-button")
            .addEventListener("click", switchLikeButton);
        htmlElement
            .querySelector(".element__delete-button")
            .addEventListener("click", deleteItem);
        htmlElement
            .querySelector(".element__image")
            .addEventListener("click", popupImage);*/
    //  elements.appendChild(htmlElement);

}

function createCard(text) {
    const htmlElement = sectionElements.cloneNode(true);
    const elementImage = htmlElement.querySelector(".element__image");
    elementImage.src = text.link;
    elementImage.alt = ('Фотография места ' + text.name);
    htmlElement.querySelector(".element__title").textContent = text.name;
    htmlElement
        .querySelector(".element__delete-button")
        .addEventListener("click", deleteItem);
    htmlElement
        .querySelector(".element__like-button")
        .addEventListener("click", switchLikeButton);
    elementImage.addEventListener("click", function() {
        popupImage(text)
    });

    return htmlElement;
}

function switchLikeButton(evt) {
    evt.target
        .closest(".element__like-button")
        .classList.toggle("element__like-button_active");
}

function deleteItem(evt) {
    /*    const editing = evt.target
            .closest(".element")
            .querySelector(".element__image").currentSrc;
        const findindex = initialCards
            .map(function(e) {
                return e.link;
            })
            .indexOf(editing);
        initialCards.splice(findindex, 1);*/
    evt.target.closest(".element").remove();
}

function openFormProfile() {
    formName.value = profiletitle.textContent;
    formdescription.value = profilesubtitle.textContent;
    openPopUp(profilePopup);
}

function openFormItem() {
    formPlace.value = "";
    formLink.value = "";
    openPopUp(cardPopup);
}

function popupImage(text) {
    openPopUp(previewPopup);
    image.src = text.link;
    caption.textContent = text.name;
    image.alt = ('Фото места ' + text.name);

}

function openPopUp(item) {
    enableValidation();
    item.classList.add("popup_opened");

}

function closePopup(element) {
    element.closest(".popup").classList.remove("popup_opened");
}

function submitFormProfile(event) {
    event.preventDefault();
    profiletitle.textContent = formName.value;
    profilesubtitle.textContent = formdescription.value;

}

function submitFormElement(event) {
    event.preventDefault();
    /*  initialCards.splice(0, 0, { name: formPlace.value, link: formLink.value });
      deleteItems();
      render();*/
    const htmlElement = createCard({ name: formPlace.value, link: formLink.value });
    elements.prepend(htmlElement);

}

/*function deleteItems() {
    const elements = document.querySelector(".elements");
    while (elements.firstChild) {
        elements.removeChild(elements.firstChild);
    }
}*/

function checkElementClose(evt) {
    if (
        evt.target.classList.contains("container__button-close") ||
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("form__button-submit")
    ) {
        closePopup(evt.target);
    }
}

function pressKey(evt, popup) {
    if (evt.key === "Escape") {
        closePopup(popup);
    }
}