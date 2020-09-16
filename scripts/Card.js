export default class Card {
  
  constructor(item, cardSelector) {
    this._image = item.image;
    this._title = item.title;
    this._cardSelector = cardSelector;
  }
 
  _getTemplate() {
    const cardElement = document  
      .querySelector('#element')
      .content      
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(this._element);
  // Вернём элемент наружу
    return this._element; 
  }
    
  _deleteCard(ment) {    
    const element = ment.parentElement;
    element.remove();
  }

  _setEventListeners(cont) {
    const delButton = cont.querySelector('.element__delete-card');
    delButton.addEventListener('click', evt => {this._deleteCard(evt.target)});
  }
}