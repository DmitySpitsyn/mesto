let content = document.querySelector('.content');
let editbutton = content.querySelector('.profile__edit-button');
let popup = content.querySelector('.popup');
let CloseButton = popup.querySelector('.form__button-reset');
let submit = popup.querySelector('.form');
let profiletitle = content.querySelector('.profile__title');
let profilesubtitle = content.querySelector('.profile__subtitle');
let formName = popup.querySelector('.form__input-name');
let formdescription = popup.querySelector('.form__input-description');



editbutton.addEventListener('click', OpenPopUp);
popup.addEventListener('click', ClosePopup);
submit.addEventListener('submit', SubmitForm);



function OpenPopUp() {

    formName.value = profiletitle.textContent;
    formdescription.value = profilesubtitle.textContent;
    popup.classList.add('popup_opened');

}

function ClosePopup() {

    if (event.target === popup || event.target === CloseButton) {
        popup.classList.remove('popup_opened');

    }
}

function SubmitForm(event) {
    event.preventDefault();
    profiletitle.textContent = formName.value;
    profilesubtitle.textContent = formdescription.value;
    popup.classList.remove('popup_opened');
}