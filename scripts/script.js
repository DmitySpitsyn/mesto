const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const content = document.querySelector('.content');
const sectionElements = document.querySelector(".section-elements").content;
const elements = document.querySelector(".elements");
const addElement = document.querySelector('.profile__add-button');
const formtitle = document.querySelector('.container__title');
const containerForm = content.querySelector('.container_type_form');
const containerImage = content.querySelector('.container_type_image');
const image = content.querySelector('.container__image');
const caption = content.querySelector('.container__caption');
const popup = content.querySelector('.popup');
const closeImage = popup.querySelector('.container__button-close_type_image');
const editbutton = content.querySelector('.profile__edit-button');
const closeForm = popup.querySelector('.container__button-close_type_form');
const formProfile = popup.querySelector('.form-profile');
const formElement = popup.querySelector('.form-add-element');
const profiletitle = content.querySelector('.profile__title');
const profilesubtitle = content.querySelector('.profile__subtitle');
const formName = popup.querySelector('.form__input_type_name');
const formdescription = popup.querySelector('.form__input_type_description');
const formPlace = popup.querySelector('.form__input_type_place-name');
const formLink = popup.querySelector('.form__input_type_place-link');






editbutton.addEventListener('click', openFormProfile);
popup.addEventListener('click', closePopup);
addElement.addEventListener('click', addItem);
formProfile.addEventListener('submit', submitFormProfile);
formElement.addEventListener('submit', submitFormElement);
render();

function render() {
    initialCards.forEach(renderItem);
}

function renderItem(text) {
    const htmlElement = sectionElements.cloneNode(true);
    htmlElement.querySelector('.element__image').src = text.link;
    htmlElement.querySelector('.element__title').textContent = text.name;
    htmlElement.querySelector('.element__like-button').addEventListener('click', switchLikeButton);
    htmlElement.querySelector('.element__delete-button').addEventListener('click', deleteItem);
    htmlElement.querySelector('.element__image').addEventListener('click', popupImage);
    elements.appendChild(htmlElement);
}


function switchLikeButton(evt) {
    evt.target.closest('.element__like-button').classList.toggle('element__like-button_active');
}

function deleteItem(evt) {
    const editing = event.path[1].children[1].currentSrc;
    let index = initialCards.map(function(e) { return e.link; }).indexOf(editing);
    initialCards.splice(index, 1);
    evt.target.closest('.element').remove();
}

function addItem() {
    openPopUp();
    containerImage.classList.remove('container_visible_on');
    formProfile.classList.remove('form_visible_on');
    formElement.classList.add('form_visible_on');
    containerForm.classList.add('container_visible_on');
    formPlace.value = '';
    formLink.value = '';
    formtitle.textContent = 'Новое место';
}

function popupImage(evt) {
    openPopUp();
    popup.classList.add('popup_type_image');
    containerImage.classList.add('container_visible_on');
    containerForm.classList.remove('container_visible_on');
    image.src = evt.target.src;
    caption.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;


}

function openPopUp() {
    popup.classList.remove('popup_closed');
    popup.classList.add('popup_opened');

}

function closePopup() {

    if (event.target === popup || event.target === closeForm || event.target === closeImage) {
        popup.classList.add('popup_closed');
        setTimeout(function() { popup.classList.remove('popup_opened'); }, 1000);
        popup.classList.remove('popup_type_image');
    }
}

function openFormProfile() {
    openPopUp();
    formElement.classList.remove('form_visible_on');
    containerImage.classList.remove('container_visible_on');
    formProfile.classList.add('form_visible_on');
    containerForm.classList.add('container_visible_on');
    formName.value = profiletitle.textContent;
    formdescription.value = profilesubtitle.textContent;
    formtitle.textContent = 'Редактировать профиль';

}

function submitFormProfile(event) {
    event.preventDefault();
    profiletitle.textContent = formName.value;
    profilesubtitle.textContent = formdescription.value;
    popup.classList.remove('popup_opened');
}

function submitFormElement(event) {
    event.preventDefault();
    initialCards.splice(0, 0, { name: formPlace.value, link: formLink.value });
    deleteItems();
    render();
    popup.classList.remove('popup_opened');
}

function deleteItems() {
    const elements = document.querySelector('.elements');
    while (elements.firstChild) {
        elements.removeChild(elements.firstChild);
    }
}