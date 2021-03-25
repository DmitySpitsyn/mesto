import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import {
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
    options,
    deleteCardId,
} from "../utils/constants.js";

editbutton.addEventListener("click", openFormProfile);
addElement.addEventListener("click", openFormItem);
avatarButton.addEventListener("click", openFormAvatar);

const userinfo = new UserInfo(userSelectors);

const api = new Api(options)

let username = '';

api.getUser().then(data => {
    userinfo.setUserInfo(data.name, data.about, data.avatar);
    username = data;
});
console.log(username)
    // const username = userinfo.getUserInfo();

const cardList = new Section({
        renderer: (item) => {

            const card = new Card(
                item, username, { confirmDeleteCard, checkLike }, {
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


const popupConfirm = new PopupWithForm(confirmPopup, {
    submitForm: (inputs) => {
        api.deleteCard(inputs.cardId).then(() => document.getElementById(inputs.cardId).closest(".element").remove());
        popupConfirm.close();
    }
});


api.getInitialCards().then(data => {
    cardList.renderItems(data);
})


const popupWithImage = new PopupWithImage(previewPopup);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link);
};


function confirmDeleteCard(cardId) {
    deleteCardId.value = cardId;
    popupConfirm.open();
}

function checkLike(evt, counter, likeCounter) {
    if (evt.target.classList.contains("element__like-button_active")) {
        api.addLike(likeCounter.id).then(() => {
            counter += 1;
            likeCounter.textContent = counter;
        })

    } else {
        api.deleteLike(likeCounter.id).then(() => {
            counter -= 1;
            likeCounter.textContent = counter;
        });
    }
}

popupConfirm.setEventListeners();


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
        popUpFormProfile.loading();
        api.editUser(inputs.profilename, inputs.profiledescription).then(data => {
            userinfo.setUserInfo(data.name, data.about, data.avatar);
            popUpFormProfile.close();
            popUpFormProfile.loaded();
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
        popUpFormAvatar.loading();
        api.editAvatar(inputs).then(data => {
            userinfo.setUserInfo(data.name, data.about, data.avatar);
            popUpFormAvatar.close();
            popUpFormAvatar.loaded();
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
        popUpFormItem.loading();
        api.addCard({ name: inputs.placename, link: inputs.placelink }).then(data => {
            const card = new Card(
                data, username, { confirmDeleteCard, checkLike }, { handleCardClick },
                ".section-elements"
            );
            const cardElement = card.createCard();
            cardList.addPrependItem(cardElement);
            popUpFormItem.close();
            popUpFormItem.loaded();
        })
    },
});

function openFormItem() {
    popUpFormItem.open();
}

popUpFormItem.setEventListeners();