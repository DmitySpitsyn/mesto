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
const sectionElements = document.querySelector(".section-elements").content;
const Elements = document.querySelector(".elements");
const AddElement = document.querySelector('.profile__add-button');
const formtitle = document.querySelector('.container__title');
const imagefull = content.querySelector('.container__image');
const containerForm = content.querySelector('.popup__form');
const containerImage = content.querySelector('.popup__image');
const image = content.querySelector('.container__image');
const CloseImage = popup.querySelector('.popup__image_close');
AddElement.addEventListener('click', AddItem);
render();

function render() {

    initialCards.forEach(renderItem);
}

function renderItem(text) {
    const htmlElement = sectionElements.cloneNode(true);

    htmlElement.querySelector('.element__image').src = text.link;
    htmlElement.querySelector('.element__title').textContent = text.name;
    htmlElement.querySelector('.element__like-button').addEventListener('click', buttonLikeSwith);
    htmlElement.querySelector('.element__delete-button').addEventListener('click', ItemDelete);
    htmlElement.querySelector('.element__image').addEventListener('click', popupImage);
    Elements.appendChild(htmlElement);
}


function buttonLikeSwith(evt) {

    evt.target.closest('.element__like-button').classList.toggle('element__like-button_active');
}

function ItemDelete(evt) {
    const editing = event.path[1].children[1].currentSrc;
    const index = initialCards.map(function(e) { return e.link; }).indexOf(editing);
    initialCards.splice(index, 1);
    evt.target.closest('.element').remove();
}

function AddItem() {
    OpenPopUp();
    containerImage.classList.remove('container_visible_on');
    containerForm.classList.add('container_visible_on');
    formName.value = '';
    formName.placeholder = 'Название';
    formdescription.value = '';
    formdescription.placeholder = 'Ссылка на картинку';
    formtitle.textContent = 'Новое место';
}

function popupImage(evt) {
    OpenPopUp();
    containerImage.classList.add('container_visible_on');
    containerForm.classList.remove('container_visible_on');
    image.src = evt.target.src;

}