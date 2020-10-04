import Popup from './Popup.js';
import { addContainer, container, namePic, linkPic } from '../utils/constants.js';

export default class PopupWithForm extends Popup{ 
  
  constructor( { submitFunc, submitEdit}, popupSelector) {
    super(popupSelector);
    this._submitFunc = submitFunc;
    this._submitEdit = submitEdit;
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
    container.addEventListener('submit', this._submitEdit); //перенос данных формы по клику Submit (имя и работа) и закрытие
    addContainer.addEventListener('submit', this._submitFunc);// задействуем форму добавления элемента по сабмиту
  }

  close() {
    super.close();
    namePic.value = '';
    linkPic.value = ''; 
  }
}