import './index.css';
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
    userSelectors
} from "../utils/constants.js";
import { isPlainObject } from 'jquery';

editbutton.addEventListener("click", openFormProfile);
addElement.addEventListener("click", openFormItem);

const popupWithImage = new PopupWithImage(previewPopup);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link);
};

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(
                item, {
                    handleCardClick
                },
                ".section-elements"
            );
            const cardElement = card._creatCard();
            cardList.addItem(cardElement);
        }
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

const userinfo = new UserInfo(userSelectors);

const popUpFormProfile = new PopupWithForm(profilePopup, {
    submitForm: (inputs) => {
        userinfo.setUserInfo(inputs.profilename, inputs.profiledescription);
    },
});

function openFormProfile() {
    const userprofile = userinfo.getUserInfo();
    formName.value = userprofile[0];
    formdescription.value = userprofile[1];
    profileFormValidator.toggleButtonState();
    popUpFormProfile.open();

}

popUpFormProfile.setEventListeners();


const popUpFormItem = new PopupWithForm(cardPopup, {
    submitForm: (inputs) => {
        const oneCard = new Section({
                items: [{ name: inputs.placename, link: inputs.placelink }],
                renderer: (item) => {
                    const card = new Card(
                        item, {
                            handleCardClick
                        },
                        ".section-elements"
                    );
                    const cardElement = card._creatCard();
                    cardList.addPrependItem(cardElement);
                }
            },
            containerSelector
        );
        oneCard.renderItems();
    },
});

function openFormItem() {
    addFormValidator.toggleButtonState();
    popUpFormItem.open();
}

popUpFormItem.setEventListeners();