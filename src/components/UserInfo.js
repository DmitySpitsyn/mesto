export class UserInfo {
    constructor(userSelectors) {
        this._username = userSelectors.name;
        this._userprofile = userSelectors.profile;
        this._profiletitle = document.querySelector(this._username);
        this._profilesubtitle = document.querySelector(this._userprofile);
    }
    getUserInfo() {
        const _username = this._profiletitle.textContent;
        const _userprofile = this._profilesubtitle.textContent;
        return [_username, _userprofile];
    }
    setUserInfo(name, profile) {
        this._profiletitle.textContent = name;
        this._profilesubtitle.textContent = profile;
    }
}