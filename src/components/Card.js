export default class Card {  
  
  constructor(item, cardSelector, { handleCardClick }) {
    this._image = item.link;
    this._title = item.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likes = item.likes;
    this._id = item.id;
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
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._likeBtn = this._element.querySelector('.element__like')
    this._setEventListeners();

    this._elementImage.src = this._image || document.querySelector('#link').value; //  определили картинку для карточки из массива или из формы
    this._elementImage.alt = this._title || document.querySelector('#namePic').value;// определили альт картинки для карточки из массива или из формы
    this._elementTitle.textContent = this._title || document.querySelector('#namePic').value;//  определили название для карточки из массива или из формы

    if(this.isLiked(this._likes)){
          this._likeActive();
        }
      // Вернём элемент 
    return this._element; 
    
  }

  _likeActive(){
    this._likeBtn.classList.add('element__like_active');
  }
  _likeUnactive(){
    this._likeBtn.classList.remove('element__like_active');
  }

  
  isLiked(data){
    if(data.find(item => item._id === "d11a2f0d97502500a3df5278")){
      return true;
    } else {
      return false;
    }
  }
  
  // ставим количество на счетчике и активный класс лайку
  checkLikeClass(data){
    this._likes = data;
    this._likeCounter.textContent = this._likes.length;
    if( this._likeBtn.classList.contains('element__like_active')){
      this._likeUnactive();
    } else {
      this._likeActive();
    }
  }
    
  _deleteCard(delButton) {    
    delButton.parentElement.remove();
  }

  _setEventListeners() {
   // this._element.querySelector('.element__like').addEventListener('click', this._likeBtn);
    this._elementImage.addEventListener('click', this._handleCardClick); 
  }
}
