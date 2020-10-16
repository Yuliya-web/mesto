import Popup from './Popup.js';

export default class PopupWithImage extends Popup{  

  constructor(popupSelector, item) {
    super(popupSelector);
    this._popupSelector.querySelector('.pic-popup__content').src = item.link;  //подтягивает картинку 
    this._popupSelector.querySelector('.pic-popup__name').textContent = item.name; //подтягивает имя элемента
  }
  
}