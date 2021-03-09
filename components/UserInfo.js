export class UserInfo {
    constructor(name, profile) {
        this._name = name;
        this._profile = profile;
        this._profiletitle = document.querySelector(".profile__title");
        this._profilesubtitle = document.querySelector(".profile__subtitle");
    }
    getUserInfo() {
        const _username = this._profiletitle.textContent;
        const _userprofile = this._profilesubtitle.textContent;
        return [_username, _userprofile];
    }
    setUserInfo() {
        this._profiletitle.textContent = this._name;
        this._profilesubtitle.textContent = this._profile;
    }
}