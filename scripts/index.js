import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
const validationSetting = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button-submit",
    inactiveButtonClass: "form__button-submit_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
};
const content = document.querySelector(".content");
const elements = document.querySelector(".elements");
const addElement = document.querySelector(".profile__add-button");
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

editbutton.addEventListener("click", openFormProfile);
addElement.addEventListener("click", openFormItem);
formProfile.addEventListener("submit", submitFormProfile);
formElement.addEventListener("submit", submitFormElement);

initialCards.forEach((data) => {
    const card = new Card(data, ".section-elements");
    const cardElement = card._creatCard();

    elements.appendChild(cardElement);
});

const profileFormValidator = new FormValidator(validationSetting, ".form-profile");
const profileValidator = profileFormValidator.enableValidation();
const addFormValidator = new FormValidator(validationSetting, ".form-add-element");
const addValidator = addFormValidator.enableValidation();


function openFormProfile() {
    formName.value = profiletitle.textContent;
    formdescription.value = profilesubtitle.textContent;
    profileFormValidator.checkInputValidity();
    openPopUp(profilePopup);
}

function openFormItem() {
    formPlace.value = "";
    formLink.value = "";
    addFormValidator.checkInputValidity();
    openPopUp(cardPopup);
}

export function popupImage(name, link) {
    openPopUp(previewPopup);
    image.src = link;
    caption.textContent = name;
    image.alt = "Фото места " + name;
}

function openPopUp(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
    popup.addEventListener("click", closeByClick);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
    popup.removeEventListener("click", closeByClick);
}

function submitFormProfile(event) {
    event.preventDefault();
    profiletitle.textContent = formName.value;
    profilesubtitle.textContent = formdescription.value;
}

function submitFormElement(event) {
    event.preventDefault();
    const htmlElement = new Card({ name: formPlace.value, link: formLink.value },
        ".section-elements"
    );
    const cardElement = htmlElement._creatCard();
    elements.prepend(cardElement);
}

function closeByClick(evt) {
    if (
        evt.target.classList.contains("container__button-close") ||
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("form__button-submit")
    ) {
        closePopup(evt.target.closest(".popup"));
    }
}

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}