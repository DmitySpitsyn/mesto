import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
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

const userinfo = new UserInfo(userSelectors);

const cardList = new Section({
        //   items: initialCards,
        renderer: (item) => {
            const card = new Card(
                item, {
                    handleCardClick
                },
                ".section-elements"
            );
            const cardElement = card.createCard();
            cardList.addItem(cardElement);
        }
    },
    containerSelector
);


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: '7c009fa5-838d-4eed-9e1c-8223a7c4bd46',
        'Content-Type': 'application/json'
    }
}, {
    setUser: (data) => {
        userinfo.setUserInfo(data.name, data.about, data.avatar);
    },

}, {
    setCards: (data) => {
        cardList.renderItems(data);
    }
});

const popupWithImage = new PopupWithImage(previewPopup);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link);
};



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

const popUpFormProfile = new PopupWithForm(profilePopup, {
    submitForm: (inputs) => {
        api.editUser(inputs.profilename, inputs.profiledescription);
    },
});

function openFormProfile() {
    const userprofile = userinfo.getUserInfo();
    console.log(userprofile);
    formName.value = userprofile[0];
    formdescription.value = userprofile[1];
    popUpFormProfile.open();
    // api.editUser();

}

popUpFormProfile.setEventListeners();

const popUpFormItem = new PopupWithForm(cardPopup, {
    submitForm: (inputs) => {
        const item = { name: inputs.placename, link: inputs.placelink };
        const card = new Card(
            item, { handleCardClick },
            ".section-elements"
        );
        const cardElement = card.createCard();
        cardList.addPrependItem(cardElement);
    },
});

function openFormItem() {
    popUpFormItem.open();
}

popUpFormItem.setEventListeners();


api.getUser();
api.getInitialCards();