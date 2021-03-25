export const options = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: '0580f149-23a8-48c1-89e6-809604281955',
        'Content-Type': 'application/json'
    }
}

export const validationSetting = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button-submit",
    inactiveButtonClass: "form__button-submit_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
};
export const userSelectors = {
    name: ".profile__title",
    profile: ".profile__subtitle",
    avatar: ".profile__image"
};
export const content = document.querySelector(".content");
export const containerSelector = ".elements";
export const addElement = document.querySelector(".profile__add-button");
export const avatarButton = document.querySelector(".profile__avatar-button");
export const profilePopup = ".popup-profile";
export const avatarPopup = ".popup-update-avatar";
export const cardPopup = ".popup-card-create";
export const previewPopup = ".popup-preview";
export const confirmPopup = ".confirm-popup";
export const editbutton = content.querySelector(".profile__edit-button");
export const formName = content.querySelector(".form__input_type_name");
export const formdescription = content.querySelector(
    ".form__input_type_description"
);
export const deleteCardId = content.querySelector(".form__input_type_cardId");