import Popup from './Popup.js';

export default class PopupWithForm extends Popup{ 
  
  constructor( { formSelector, onSubmit }, popupSelector) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector(formSelector);
    this._onSubmit = onSubmit;
  }
 
  setEventListeners() {
    super.setEventListeners(); 
    this._form.addEventListener('submit', this._onSubmit); //перенос данных формы по клику Submit и закрытие
  }

  close() {
    super.close();
    this._form.reset();
  }
}