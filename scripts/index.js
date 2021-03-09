import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
    initialCards,
    validationSetting,
    containerSelector,
    addElement,
    profilePopup,
    cardPopup,
    previewPopup,
    editbutton,
    formName,
    formdescription,
} from "../utils/constants.js";

editbutton.addEventListener("click", openFormProfile);
addElement.addEventListener("click", openFormItem);

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

const profileFormValidator = new FormValidator(
    validationSetting,
    ".form-profile"
);
profileFormValidator.enableValidation();
const addFormValidator = new FormValidator(
    validationSetting,
    ".form-add-element"
);
addFormValidator.enableValidation();

function openFormProfile() {
    const userinfo = new UserInfo();
    const userprofile = userinfo.getUserInfo();
    formName.value = userprofile[0];
    formdescription.value = userprofile[1];
    profileFormValidator.checkInputValidity();

    const popUp = new PopupWithForm(profilePopup, {
        submitForm: (inputs) => {
            const userinfo = new UserInfo(inputs[0].value, inputs[1].value);
            userinfo.setUserInfo();
        },
    });
    popUp.open();
}

function openFormItem() {
    addFormValidator.checkInputValidity();
    let popUp = new PopupWithForm(cardPopup, {
        submitForm: (inputs) => {
            let oneCard = new Section({
                    items: [{ name: inputs[0].value, link: inputs[1].value }],
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
            oneCard.renderItems();
        },
    });
    popUp.open();
}