export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);

    }

    addItem(cardElement) {
        this._container.appendChild(cardElement);
    }
    addPrependItem(cardElement) {
        this._container.prepend(cardElement);
    }

    renderItems(data) {
        data.forEach((item) => {
            this._renderer(item);

        });
    }
}