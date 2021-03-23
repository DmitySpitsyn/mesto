export class Api {
    constructor(options) {
        this.options = options;

    }
    getUser() {
        return fetch(this.options.baseUrl + '/users/me', {
            headers: this.options.headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error('Произошла ошибка с кодом ', res.status));
        })
    };



    editUser(name, about) {
        return fetch(this.options.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this.options.headers,
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


    getInitialCards() {
        return fetch(this.options.baseUrl + '/cards', {
            headers: this.options.headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error('Произошла ошибка с кодом ', res.status));
        }).catch(err => Promise.reject(err))
    }

    addCard(item) {

        return fetch(this.options.baseUrl + '/cards', {
            method: 'POST',
            headers: this.options.headers,
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


}