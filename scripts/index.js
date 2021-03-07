import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import {
    initialCards,
    validationSetting,
    containerSelector,
    addElement,
    profilePopup,
    cardPopup,
    previewPopup,
    image,
    caption,
    editbutton,
    formProfile,
    formElement,
    profiletitle,
    profilesubtitle,
    formName,
    formdescription,
    formPlace,
    formLink,
} from "../utils/constants.js";

editbutton.addEventListener("click", openFormProfile);
addElement.addEventListener("click", openFormItem);
formProfile.addEventListener("submit", submitFormProfile);
formElement.addEventListener("submit", submitFormElement);

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, ".section-elements");
            const cardElement = card._creatCard();
            cardList.addItem(cardElement);
        },
    },
    containerSelector
);
cardList.renderItems();

const oneCard = new Section({
        items: [{ name: formPlace.value, link: formLink.value }],
        renderer: (item) => {
            const card = new Card(item, ".section-elements");
            const cardElement = card._creatCard();
            oneCard.addPrependItem(cardElement);
        },
    },
    containerSelector
);

const profileFormValidator = new FormValidator(
    validationSetting,
    ".form-profile"
);
const profileValidator = profileFormValidator.enableValidation();
const addFormValidator = new FormValidator(
    validationSetting,
    ".form-add-element"
);
const addValidator = addFormValidator.enableValidation();

function openFormProfile() {
    formName.value = profiletitle.textContent;
    formdescription.value = profilesubtitle.textContent;
    profileFormValidator.checkInputValidity();
    const popUp = new Popup(profilePopup);
    popUp.open();
    // openPopUp(profilePopup);
}

function openFormItem() {
    formPlace.value = "";
    formLink.value = "";
    addFormValidator.checkInputValidity();
    const popUp = new Popup(cardPopup);
    popUp.open();
    //    openPopUp(cardPopup);
}

export function popupImage(name, link) {
    const popUp = new Popup(previewPopup);
    popUp.open();
    //  openPopUp(previewPopup);
    image.src = link;
    caption.textContent = name;
    image.alt = "Фото места " + name;
}
/*
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
*/
function submitFormProfile(event) {
    event.preventDefault();
    profiletitle.textContent = formName.value;
    profilesubtitle.textContent = formdescription.value;
}

function submitFormElement(event) {
    event.preventDefault();
    oneCard.renderItems();
}
/*
export function closeByClick(evt) {
    console.log(evt)
    if (
        evt.target.classList.contains("container__button-close") ||
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("form__button-submit")
    ) {
        console.log('yess')
        closePopup(evt.target.closest(".popup"));
    }
}

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }*/