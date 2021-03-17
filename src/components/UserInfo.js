export class UserInfo {
    constructor(userSelectors) {
        this._username = userSelectors.name;
        this._userprofile = userSelectors.profile;
        this._useravatar = userSelectors.avatar;
        this._profiletitle = document.querySelector(this._username);
        this._profilesubtitle = document.querySelector(this._userprofile);
        this._profileavatar = document.querySelector(this._useravatar)

    }
    getUserInfo() {
        const _username = profilename;
        const _userprofile = profileabout;
        return [_username, _userprofile];
    }
    setUserInfo(name, profile, avatar) {
        this._profiletitle.textContent = name;
        this._profilesubtitle.textContent = profile;
        this._profileavatar.src = avatar
    }
}