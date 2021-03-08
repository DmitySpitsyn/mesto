export const initialCards = [{
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
export const validationSetting = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button-submit",
    inactiveButtonClass: "form__button-submit_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
};
export const content = document.querySelector(".content");
export const containerSelector = ".elements";
export const addElement = document.querySelector(".profile__add-button");
export const profilePopup = content.querySelector(".popup-profile");
export const cardPopup = content.querySelector(".popup-card-create");
export const previewPopup = content.querySelector(".popup-preview");
export const editbutton = content.querySelector(".profile__edit-button");
export const formProfile = content.querySelector(".form-profile");
export const formElement = content.querySelector(".form-add-element");
export const profiletitle = content.querySelector(".profile__title");
export const profilesubtitle = content.querySelector(".profile__subtitle");
export const formName = content.querySelector(".form__input_type_name");
export const formdescription = content.querySelector(
    ".form__input_type_description"
);
export const formPlace = content.querySelector(".form__input_type_place-name");
export const formLink = content.querySelector(".form__input_type_place-link");