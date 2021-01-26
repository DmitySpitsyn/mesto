const initialCards = [{
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];
const content = document.querySelector(".content");
const sectionElements = document.querySelector(".section-elements").content;
const elements = document.querySelector(".elements");
const addElement = document.querySelector(".profile__add-button");
const formtitle = document.querySelector(".container__title");
const containerProfile = content.querySelector(".container_type_form-profile");
const containerItem = content.querySelector(".container_type_form-element");
const containerImage = content.querySelector(".container_type_image");
const image = content.querySelector(".container__image");
const caption = content.querySelector(".container__caption");
const popup = content.querySelector(".popup");
const editbutton = content.querySelector(".profile__edit-button");
const closeContainer = popup.querySelectorAll(".container__button-close");
const formProfile = popup.querySelector(".form-profile");
const formElement = popup.querySelector(".form-add-element");
const profiletitle = content.querySelector(".profile__title");
const profilesubtitle = content.querySelector(".profile__subtitle");
const formName = popup.querySelector(".form__input_type_name");
const formdescription = popup.querySelector(".form__input_type_description");
const formPlace = popup.querySelector(".form__input_type_place-name");
const formLink = popup.querySelector(".form__input_type_place-link");
const submitButton = popup.querySelectorAll(".form__button-submit");

editbutton.addEventListener("click", openFormProfile);
popup.addEventListener("click", closePopup);
addElement.addEventListener("click", openFormItem);
formProfile.addEventListener("submit", submitFormProfile);
formElement.addEventListener("submit", submitFormElement);
render();

function render() {
    initialCards.forEach(renderItem);
}

function renderItem(text) {
    const htmlElement = sectionElements.cloneNode(true);
    htmlElement.querySelector(".element__image").src = text.link;
    htmlElement.querySelector(".element__title").textContent = text.name;
    htmlElement
        .querySelector(".element__like-button")
        .addEventListener("click", switchLikeButton);
    htmlElement
        .querySelector(".element__delete-button")
        .addEventListener("click", deleteItem);
    htmlElement
        .querySelector(".element__image")
        .addEventListener("click", popupImage);
    elements.appendChild(htmlElement);
}

function switchLikeButton(evt) {
    evt.target
        .closest(".element__like-button")
        .classList.toggle("element__like-button_active");
}

function deleteItem(evt) {
    const editing = evt.target
        .closest(".element")
        .querySelector(".element__image").currentSrc;
    console.log(editing);
    let index = initialCards
        .map(function(e) {
            return e.link;
        })
        .indexOf(editing);
    initialCards.splice(index, 1);
    evt.target.closest(".element").remove();
}

function openFormProfile() {
    openPopUp(containerProfile, "container_visible_on");
    formName.value = profiletitle.textContent;
    formdescription.value = profilesubtitle.textContent;
}

function openFormItem() {
    openPopUp(containerItem, "container_visible_on");
    formPlace.value = '';
    formLink.value = '';

}

function popupImage(evt) {
    openPopUp(containerImage, "container_visible_on");
    popup.classList.add("popup_type_image");
    image.src = evt.target.src;
    caption.textContent = evt.target
        .closest(".element")
        .querySelector(".element__title").textContent;
}

function openPopUp(item, addclass) {
    item.classList.add(addclass);
    popup.classList.add("popup_opened");
}

function closePopup(event) {
    let subButton = false;
    submitButton.forEach(function(element) {
        if (event.target === element) {
            subButton = true;
        }
        return subButton;
    });

    let closebutton = false;
    closeContainer.forEach(function(element) {
        if (event.target === element) {
            closebutton = true;
        }
        return closebutton;
    });
    if (event.target === popup || closebutton === true || subButton === true) {
        popup.classList.add("popup_closed");
        setTimeout(function() {
            popup.classList.remove("popup_opened");
            event.target
                .closest(".popup")
                .querySelectorAll(".container")
                .forEach((cont) => cont.classList.remove("container_visible_on"));
            popup.classList.remove("popup_type_image");
            popup.classList.remove("popup_closed");
        }, 1000);
    }
}

function submitFormProfile(event) {
    event.preventDefault();
    profiletitle.textContent = formName.value;
    profilesubtitle.textContent = formdescription.value;
}

function submitFormElement(event) {
    event.preventDefault();
    initialCards.splice(0, 0, { name: formPlace.value, link: formLink.value });
    deleteItems();
    render();
}

function deleteItems() {
    let elements = document.querySelector(".elements");
    while (elements.firstChild) {
        elements.removeChild(elements.firstChild);
    }
}