let content = document.querySelector('.content');
let editbutton = content.querySelector('.profile__edit-button');
let popup = content.querySelector('.popup');
let CloseButton = popup.querySelector('.popup__form_close');
let submit = popup.querySelector('.form');
let profiletitle = content.querySelector('.profile__title');
let profilesubtitle = content.querySelector('.profile__subtitle');
let formName = popup.querySelector('.form__input_type_name');
let formdescription = popup.querySelector('.form__input_type_description');



editbutton.addEventListener('click', OpenForm);
popup.addEventListener('click', ClosePopup);
submit.addEventListener('submit', SubmitForm);



function OpenPopUp() {

    popup.classList.add('popup_opened');

}

function ClosePopup() {

    if (event.target === popup || event.target === CloseButton || event.target === CloseImage) {
        popup.classList.remove('popup_opened');

    }
}

function OpenForm() {
    OpenPopUp();
    containerImage.classList.remove('container_visible_on');
    containerForm.classList.add('container_visible_on');
    formName.value = profiletitle.textContent;
    formdescription.value = profilesubtitle.textContent;
    formtitle.textContent = 'Редактировать профиль';
}

function SubmitForm(event) {
    event.preventDefault();
    if (formtitle.textContent === 'Редактировать профиль') {
        profiletitle.textContent = formName.value;
        profilesubtitle.textContent = formdescription.value;
    }
    if (formtitle.textContent === 'Новое место') {

        const elements = document.querySelector('.elements');
        while (elements.firstChild) {
            elements.removeChild(elements.firstChild);
        }
        initialCards.splice(0, 0, { name: formName.value, link: formdescription.value });

        render();
    }
    popup.classList.remove('popup_opened');
}