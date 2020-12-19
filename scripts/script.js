console.log('hello');
let content = document.querySelector('.content');
let editbutton = content.querySelector('.profile__edit-button');
let overlay = content.querySelector('.overlay');
let CloseButton = overlay.querySelector('.form__button-reset');
let submit = overlay.querySelector('.form');
let profiletitle = content.querySelector('.profile__title');
let profilesubtitle = content.querySelector('.profile__subtitle');
let formName = overlay.querySelector('.form__input-name');
let formdescription = overlay.querySelector('.form__input-description');


editbutton.addEventListener('click', OpenPopUp);
overlay.addEventListener('click', ClosePopup);
submit.addEventListener('submit', SubmitForm);


function OpenPopUp() {
    console.log(profilesubtitle.textContent)
    formName.value = profiletitle.textContent;
    formdescription.value = profilesubtitle.textContent;
    overlay.classList.add('overlay__visible_on');

}

function ClosePopup() {
    console.log(event.target);
    if (event.target === overlay || event.target === CloseButton) {
        overlay.classList.remove('overlay__visible_on');

    }
}

function SubmitForm(event) {
    event.preventDefault();
    profiletitle.textContent = formName.value;
    profilesubtitle.textContent = formdescription.value;
    overlay.classList.remove('overlay__visible_on');



}