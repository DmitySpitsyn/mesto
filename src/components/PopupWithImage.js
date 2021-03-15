import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {

    constructor(popupSelector, name, link) {
        super(popupSelector);
        this._image = this._popup.querySelector(".container__image");
        this._caption = this._popup.querySelector(".container__caption");

    }
    open(name, link) {
        super.open();
        //        const _image = document.querySelector(".container__image");
        this._image.src = link;
        //    document.querySelector(".container__caption").textContent = this._name;
        this._image.alt = "Фото места " + name;
        //     _image.alt = "Фото места " + this._name;
        this._caption.textContent = name;

    }
    setEventListeners() {
        super.setEventListeners();
    }
}