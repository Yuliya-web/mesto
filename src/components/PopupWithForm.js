import Popup from './Popup.js';
import { namePic, linkPic, linkAva } from '../utils/constants.js';

export default class PopupWithForm extends Popup{ 
  
  constructor( { formSelector, onSubmit }, popupSelector) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector(formSelector);
    this._onSubmit = onSubmit;
  }
 
  _getInputValues() {
    const inputObj = {  
      link : document.querySelector('#link').value,
      name : document.querySelector('#namePic').value 
    }
    return inputObj;
  }

  setEventListeners() {
    super.setEventListeners(); 
    this._form.addEventListener('submit', this._onSubmit); //перенос данных формы по клику Submit и закрытие
  }

  close() {
    super.close();
    namePic.value = '';
    linkPic.value = ''; 
    linkAva.value = '';
  }
}