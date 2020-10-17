import Popup from './Popup.js';

export default class PopupWithImage extends Popup{  

  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector('.pic-popup__content');  // картинка
    this._title = this._popupSelector.querySelector('.pic-popup__name'); // имя элемента
  }
  
  open(item) { 
    super.open();  
    this._image.src = item.link;  //подтягивает картинку  
    this._title.textContent = item.name; //подтягивает имя элемента 
  } 
} 
