import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {

    constructor(popupSelector, name, link) {
        super(popupSelector);
        this._name = name;
        this._link = link;
    }
    open() {
        super.open();
        const _image = document.querySelector(".container__image");
        _image.src = this._link;
        document.querySelector(".container__caption").textContent = this._name;
        _image.alt = "Фото места " + this._name;

    }
}