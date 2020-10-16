
export default class UserInfo {  
  
  constructor({ nameSelector, aboutSelector, avaSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._avaSelector = document.querySelector(avaSelector);
  }

  getUserInfo() {
    const dataInfo = { 
      nameSelector : this._nameSelector.textContent, 
      aboutSelector : this._aboutSelector.textContent};
    return dataInfo ;
  }
  
  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._aboutSelector.textContent = data.about;
    this._avaSelector.src = data.avatar;
  }
}