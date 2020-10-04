import { name, about } from '../utils/constants.js';

export default class UserInfo {  
  
  constructor({ nameSelector, aboutSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const dataInfo = { 
      nameSelector : this._nameSelector.textContent, 
      aboutSelector : this._aboutSelector.textContent};
    return dataInfo ;
  }
  
  setUserInfo() {
    this._nameSelector.textContent = name.value;
    this._aboutSelector.textContent = about.value;
  }
}