export default class Card {
  
  constructor(item, cardSelector) {
    this._image = item.link;
    this._title = item.name;
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
    ment.parentElement.remove();
  }

  _setEventListeners(cont) {
    cont.querySelector('.element__delete-card').addEventListener('click', evt => {this._deleteCard(evt.target)});
  }
}