import { openPopup, popupPic } from './index.js';
export default class Card {  
  
  constructor(item, cardSelector) {
    this._image = item.link;
    this._title = item.name;
    this._cardSelector = cardSelector;
  }
 
  _getTemplate() {
    const cardElement = document  
      .querySelector(this._cardSelector)
      .content            
      .cloneNode(true);
   
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title')
    this._setEventListeners();

    this._elementImage.src = this._image || document.querySelector('#link').value; //  определили картинку для карточки из массива или из формы
    this._elementImage.alt = this._title || document.querySelector('#namePic').value;// определили альт картинки для карточки из массива или из формы
    this._elementTitle.textContent = this._title || document.querySelector('#namePic').value;//  определили название для карточки из массива или из формы
  // Вернём элемент наружу
    return this._element; 
  }

  _likeBtn(evt){  
    evt.target.classList.toggle('element__like_active');
  }
    
  _deleteCard(delButton) {    
    delButton.parentElement.remove();
  }

  _openPopupPic(){ //функция открытия увеличенной картинки   
    openPopup(popupPic);

    popupPic.querySelector('.pic-popup__content').src = this._elementImage.src;  //подтягивает картинку 
    popupPic.querySelector('.pic-popup__name').textContent = this._elementTitle.textContent; //подтягивает имя элемента 
  } 

  _setEventListeners() {
    this._element.querySelector('.element__delete-card').addEventListener('click', evt => {this._deleteCard(evt.target)});
    this._element.querySelector('.element__like').addEventListener('click', this._likeBtn);
    this._elementImage.addEventListener('click', () => {this._openPopupPic()});
  }
}
