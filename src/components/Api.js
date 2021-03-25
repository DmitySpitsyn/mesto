export class Api {
    constructor(options) {
        this._options = options;

    }
    getUser() {
        return fetch(this._options.baseUrl + '/users/me', {
            headers: this._options.headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error('Произошла ошибка с кодом ', res.status));
        })
    };



    editUser(name, about) {
        return fetch(this._options.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error('Произошла ошибка с кодом ', res.status));
        }).catch(err => Promise.reject(err))
    }

    editAvatar(data) {
        return fetch(this._options.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: data.avatarlink,
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error('Произошла ошибка с кодом ', res.status));
        }).catch(err => Promise.reject(err))
    }


    getInitialCards() {
        return fetch(this._options.baseUrl + '/cards', {
            headers: this._options.headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error('Произошла ошибка с кодом ', res.status));
        }).catch(err => Promise.reject(err))
    }

    addCard(item) {

        return fetch(this._options.baseUrl + '/cards', {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error('Произошла ошибка с кодом ', res.status));
        }).catch(err => Promise.reject(err))
    }
    deleteCard(cardId) {
        return fetch(this._options.baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: this._options.headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error('Произошла ошибка с кодом ', res.status));
        }).catch(err => Promise.reject(err))
    }

    addLike(cardId) {
        return fetch(this._options.baseUrl + '/cards/likes/' + cardId, {
            method: 'PUT',
            headers: this._options.headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error('Произошла ошибка с кодом ', res.status));
        }).catch(err => Promise.reject(err))
    }

    deleteLike(cardId) {
        return fetch(this._options.baseUrl + '/cards/likes/' + cardId, {
            method: 'DELETE',
            headers: this._options.headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error('Произошла ошибка с кодом ', res.status));
        }).catch(err => Promise.reject(err))
    }

}