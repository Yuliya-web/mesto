import Popup from './Popup.js';

export default class PopupWithImage extends Popup{  
  
  open(item) {
    super.open(); 
    this._image = item.link;
    this._title = item.name;
    this._popupSelector.querySelector('.pic-popup__content').src = this._image;  //подтягивает картинку 
    this._popupSelector.querySelector('.pic-popup__name').textContent = this._title; //подтягивает имя элемента
  }
}