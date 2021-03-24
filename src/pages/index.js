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
    avatarPopup,
    cardPopup,
    previewPopup,
    confirmPopup,
    editbutton,
    avatarButton,
    formName,
    formdescription,
    userSelectors,
    options
} from "../utils/constants.js";

editbutton.addEventListener("click", openFormProfile);
addElement.addEventListener("click", openFormItem);
avatarButton.addEventListener("click", openFormAvatar);

const userinfo = new UserInfo(userSelectors);

const api = new Api(options)

const cardList = new Section({
        //   items: initialCards,
        renderer: (item) => {
            console.log(item)
            const card = new Card(
                item, { userinfo, confirmDeleteCard, api }, {
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




const popupConfirm = new PopupWithConfirm(confirmPopup, { deleteCard });

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


function confirmDeleteCard(cardId, element) {
    popupConfirm.open(cardId, element);

}

function deleteCard(cardId, element) {
    api.deleteCard(cardId).then(() => element.closest(".element").remove());
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

const avatarFormValidator = new FormValidator(
    validationSetting,
    ".form-avatar"
);
avatarFormValidator.enableValidation();

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

const popUpFormAvatar = new PopupWithForm(avatarPopup, {
    submitForm: (inputs) => {
        console.log(inputs);
        api.editAvatar(inputs).then(data => {
            console.log(data.avatar)
            userinfo.setUserInfo(data.name, data.about, data.avatar);
        })
    },
});

popUpFormAvatar.setEventListeners();

function openFormAvatar() {

    popUpFormAvatar.open();
}

popUpFormProfile.setEventListeners();

const popUpFormItem = new PopupWithForm(cardPopup, {
    submitForm: (inputs) => {
        api.addCard({ name: inputs.placename, link: inputs.placelink }).then(data => {
            const card = new Card(
                data, { userinfo, confirmDeleteCard, api }, { handleCardClick },
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