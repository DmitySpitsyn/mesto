import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {

    constructor(popupSelector, name, link) {
        super(popupSelector);
        this._image = this._popup.querySelector(".container__image");
        this._caption = this._popup.querySelector(".container__caption");

    }
    open(name, link) {
        super.open();
        this._image.src = link;
        this._image.alt = "Фото места " + name;
        this._caption.textContent = name;

    }

}