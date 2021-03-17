export class Api {
    constructor(options, { setUser }, { setCards }) {
        this.options = options;
        this.setUser = setUser;
        this.setCards = setCards;

    }
    getUser() {

        fetch(this.options.baseUrl + '/users/me', {
                headers: this.options.headers
            }).then(res => res.json())
            .then((res) => {
                const data = {
                    name: res.name,
                    about: res.about,
                    avatar: res.avatar
                };
                this.setUser(data);

            });

    }
    getInitialCards() {
        fetch(this.options.baseUrl + '/cards', {
                headers: this.options.headers
            }).then(res => res.json())
            .then((data) => {
                this.setCards(data);
            })
    }
}