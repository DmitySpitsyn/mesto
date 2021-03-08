import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {
    initialCards,
    validationSetting,
    containerSelector,
    addElement,
    profilePopup,
    cardPopup,
    previewPopup,
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
// formProfile.addEventListener("submit", submitFormProfile);
//formElement.addEventListener("submit", submitFormElement);
/*
const handleCardClick = function(name, link) {
    const popUp = new PopupWithImage(previewPopup, name, link);
    popUp.open();
}
*/
const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(
                item, {
                    handleCardClick: (name, link) => {
                        const popUp = new PopupWithImage(previewPopup, name, link);
                        popUp.open();
                    },
                },
                ".section-elements"
            );
            const cardElement = card._creatCard();
            cardList.addItem(cardElement);
        },
    },
    containerSelector
);
cardList.renderItems();
/*
const oneCard = new Section({
        items: [{ name: formPlace.value, link: formLink.value }],
        renderer: (item) => {
            const card = new Card(
                item, {
                    handleCardClick: (name, link) => {
                        const popUp = new PopupWithImage(previewPopup, name, link);
                        popUp.open();
                    },
                },
                ".section-elements"
            );
            const cardElement = card._creatCard();
            oneCard.addPrependItem(cardElement);
        },
    },
    containerSelector
);
*/
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

    const popUp = new PopupWithForm(profilePopup, {
        submitForm: (inputs) => {
            profiletitle.textContent = inputs[0].value;
            profilesubtitle.textContent = inputs[1].value;
        }
    });
    popUp.open();
}

let popUp = new PopupWithForm(cardPopup, {
    submitForm: (inputs) => {

        let oneCard = new Section({
                items: [{ name: 'inputs[0].value', link: 'http:\e1.ru' }],
                renderer: (item) => {
                    const card = new Card(
                        item, {
                            handleCardClick: (name, link) => {
                                const popUp = new PopupWithImage(previewPopup, name, link);
                                popUp.open();
                            },
                        },
                        ".section-elements"
                    );
                    const cardElement = card._creatCard();
                    oneCard.addPrependItem(cardElement);
                },
            },
            containerSelector
        );
        oneCard.renderItem();

        console.log(oneCard);
    }
});

function openFormItem() {
    formPlace.value = "";
    formLink.value = "";
    addFormValidator.checkInputValidity();

    popUp.open();
    console.log(popUp);
}
/*
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