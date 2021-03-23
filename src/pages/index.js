import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import { Api } from "../components/Api.js";
import {
    initialCards,
    validationSetting,
    containerSelector,
    addElement,
    profilePopup,
    cardPopup,
    previewPopup,
    confirmPopup,
    editbutton,
    formName,
    formdescription,
    userSelectors,
    options
} from "../utils/constants.js";
import { isPlainObject } from 'jquery';
import { compilation } from 'webpack';

editbutton.addEventListener("click", openFormProfile);
addElement.addEventListener("click", openFormItem);

const userinfo = new UserInfo(userSelectors);

const cardList = new Section({
        //   items: initialCards,
        renderer: (item) => {
            const card = new Card(
                item, {
                    handleCardClick,
                    confirmDeleteCard
                },
                ".section-elements"
            );
            const cardElement = card.createCard();
            cardList.addItem(cardElement);
        }
    },
    containerSelector
);

const popupConfirm = new PopupWithConfirm(confirmPopup);

const api = new Api(options)

api.getUser().then(data => {
    userinfo.setUserInfo(data.name, data.about, data.avatar);
});

api.getInitialCards().then(data => {
    cardList.renderItems(data);
})


const popupWithImage = new PopupWithImage(previewPopup);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link);
};

function confirmDeleteCard() {
    popupConfirm.open();
    popupConfirm.setEventListeners();
}




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
        api.editUser(inputs.profilename, inputs.profiledescription).then(data => {
            userinfo.setUserInfo(data.name, data.about, data.avatar);
        })
    },
});

function openFormProfile() {
    const userprofile = userinfo.getUserInfo();
    formName.value = userprofile[0];
    formdescription.value = userprofile[1];
    popUpFormProfile.open();
}

popUpFormProfile.setEventListeners();

const popUpFormItem = new PopupWithForm(cardPopup, {
    submitForm: (inputs) => {
        api.addCard({ name: inputs.placename, link: inputs.placelink }).then(data => {
            const card = new Card(
                data, { handleCardClick },
                ".section-elements"
            );
            const cardElement = card.createCard();
            cardList.addPrependItem(cardElement);
        })
    },
});

function openFormItem() {
    popUpFormItem.open();
}

popUpFormItem.setEventListeners();