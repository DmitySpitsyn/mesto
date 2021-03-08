export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(cardElement) {
        this._container.appendChild(cardElement);
    }
    addPrependItem(cardElement) {
        this._container.prepend(cardElement);

    }
    renderItem() {
        this._renderer(this._renderedItems);
    }
    renderItems() {
        console.log(this._renderedItems);
        this._renderedItems.forEach((item) => {
            this._renderer(item);
        });
    }
}