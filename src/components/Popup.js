import { popupOp } from '../utils/constants.js';
export default class Popup {  
  
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }
 
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));//обработчик кнопки закрытия нажатием на Esc
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));//удалили обработчик кнопки закрытия нажатием на Esc
  }

  _handleEscClose(evt) {    
    if (evt.keyCode === 27){  
      this.close(popupOp);
    }
  }
  _closeFormByOverlay(evt){  //функция закрытия по нажатию на оверлэй
    if (evt.target === document.querySelector('.popup_opened')) {
      this.close(popupOp);
    }
  } 

  setEventListeners() {
    this._closeButton = this._popupSelector.querySelector('.popup__close-button') || this._popupSelector.querySelector('.pic-popup__close-button');
    this._closeButton.addEventListener('click', () => { this.close()}); //обработчик кнопки закрытия редактирования  
    this._popupSelector.addEventListener('click', this._closeFormByOverlay.bind(this));//обработчик кнопки закрытия по нажатию на оверлэй 
  }
}