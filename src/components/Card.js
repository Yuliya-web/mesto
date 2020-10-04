export default class Card {  
  
  constructor(item, cardSelector, { handleCardClick }) {
    this._image = item.link;
    this._title = item.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._elementTitle = this._element.querySelector('.element__title');
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

  _setEventListeners() {
    this._element.querySelector('.element__delete-card').addEventListener('click', evt => {this._deleteCard(evt.target)});
    this._element.querySelector('.element__like').addEventListener('click', this._likeBtn);
    this._elementImage.addEventListener('click', this._handleCardClick); 
  }
}
