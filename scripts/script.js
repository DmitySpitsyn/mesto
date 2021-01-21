let initialCards = [{
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
let elements = document.querySelector(".elements");
const addElement = document.querySelector('.profile__add-button');
const formtitle = document.querySelector('.container__title');
const containerForm = content.querySelector('.popup__form');
const containerImage = content.querySelector('.popup__image');
const image = content.querySelector('.container__image');
const caption = content.querySelector('.container__caption');
const popup = content.querySelector('.popup');
const closeImage = popup.querySelector('.image_close');
const editbutton = content.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.form_close');
let submit = popup.querySelector('.form');
const profiletitle = content.querySelector('.profile__title');
const profilesubtitle = content.querySelector('.profile__subtitle');
const formName = popup.querySelector('.form__input_type_name');
const formdescription = popup.querySelector('.form__input_type_description');



editbutton.addEventListener('click', openForm);
popup.addEventListener('click', closePopup);
submit.addEventListener('submit', submitForm);
addElement.addEventListener('click', addItem);

render();

function render() {
    initialCards.forEach(renderItem);
}

function renderItem(text) {
    let htmlElement = sectionElements.cloneNode(true);
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
    containerForm.classList.add('container_visible_on');
    formName.value = '';
    formName.placeholder = 'Название';
    formdescription.value = '';
    formdescription.placeholder = 'Ссылка на картинку';
    formtitle.textContent = 'Новое место';
}

function popupImage(evt) {
    openPopUp();
    popup.classList.add('popup_type_image');
    containerImage.classList.add('container_visible_on');
    containerForm.classList.remove('container_visible_on');
    image.src = evt.target.src;
    caption.textContent = event.path[1].children[2].textContent;

}

function openPopUp() {
    popup.classList.remove('popup_closed');
    popup.classList.add('popup_opened');

}

function closePopup() {

    if (event.target === popup || event.target === closeButton || event.target === closeImage) {
        popup.classList.add('popup_closed');
        setTimeout(function() { popup.classList.remove('popup_opened'); }, 1000);
        popup.classList.remove('popup_type_image');
    }
}

function openForm() {
    openPopUp();
    containerImage.classList.remove('container_visible_on');
    containerForm.classList.add('container_visible_on');
    formName.value = profiletitle.textContent;
    formdescription.value = profilesubtitle.textContent;
    formtitle.textContent = 'Редактировать профиль';
}

function submitForm(event) {
    event.preventDefault();
    switchForm();
    popup.classList.remove('popup_opened');
}

function switchForm() {
    if (formtitle.textContent === 'Редактировать профиль') {
        profiletitle.textContent = formName.value;
        profilesubtitle.textContent = formdescription.value;
    }
    if (formtitle.textContent === 'Новое место') {
        initialCards.splice(0, 0, { name: formName.value, link: formdescription.value });
        deleteItems();
        render();
    }
}

function deleteItems() {
    const elements = document.querySelector('.elements');
    while (elements.firstChild) {
        elements.removeChild(elements.firstChild);
    }
}