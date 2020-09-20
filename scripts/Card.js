export default class Card {  //p.s.мне не трудно, я справляюсь. Просто скажите, в чем проблемы и я буду их устранять (это и есть обучение)
  
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

    cardElement.querySelector('.element__image').src = this._image || document.querySelector('#link').value; //  определили картинку для карточки из массива или из формы
    cardElement.querySelector('.element__image').alt = this._title || document.querySelector('#namePic').value;// определили альт картинки для карточки из массива или из формы
    cardElement.querySelector('.element__title').textContent = this._title || document.querySelector('#namePic').value;//  определили название для карточки из массива или из формы
    
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(this._element);
  // Вернём элемент наружу
    return this._element; 
  }

  _likeBtn(evt){  
    evt.target.classList.toggle('element__like_active');
  }
    
  _deleteCard(delButton) {    
    delButton.parentElement.remove();
  }

  _setEventListeners(activeElement) {
    activeElement.querySelector('.element__delete-card').addEventListener('click', evt => {this._deleteCard(evt.target)});
    activeElement.querySelector('.element__like').addEventListener('click', this._likeBtn);
  }
}