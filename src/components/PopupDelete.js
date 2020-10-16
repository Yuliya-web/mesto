import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor( popupSelector, yesButton, { onCkick }) {
    super(popupSelector);
    this._onClick = onCkick;
    this._yesButton = this._popupSelector.querySelector(yesButton);
  }
  

  setEventListeners() {
    super.setEventListeners(); 
    this._yesButton.addEventListener('click', (evt) => {//по клику удаляет и закрывает
      evt.preventDefault();
      this._onClick();
      this.close();
    }); 
  }
}