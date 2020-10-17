import Popup from './Popup.js';

export default class PopupWithForm extends Popup{ 
  
  constructor( { formSelector, onSubmit }, popupSelector) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector(formSelector);
    this._onSubmit = onSubmit;
  }

  _getInputValues() { 
    this._formObj = {};
    this._dataInputs = Array.from(this.popupSelector.querySelectorAll('.popup__name-field'));
    this._dataInputs.forEach(inputObj => {this._formObj[inputObj.name] = inputObj.value})
    return this._formObj;
  } 
 
  setEventListeners() {
    super.setEventListeners(); 
    this._form.addEventListener('submit', () => {this._onSubmit(this._getInputValues)}); //перенос данных формы по клику Submit и закрытие
  }

  close() {
    super.close();
    this._form.reset();
  }
}