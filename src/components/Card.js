export default class Card {  
  
  constructor(item, myId, cardSelector, { handleCardClick }, { showAndDelete }, { likeOff }, { likeOn }) {
    this._image = item.link;
    this._title = item.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likes = item.likes;
    this._showAndDelete = showAndDelete;
    this._likeOff = likeOff;
    this._likeOn = likeOn;
    this._myId = myId;
    this._ownerId = item.owner._id;
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
    this._likeBtn = this._element.querySelector('.element__like');
    this._delBtn = this._element.querySelector('.element__delete-card');
    this._setEventListeners();

    this._elementImage.src = this._image //  определили картинку 
    this._elementImage.alt = this._title // определили альт картинки
    this._elementTitle.textContent = this._title //  определили название для карточки 
    if(this._isLiked(this._likes)) {
      this._likeActive()
    }
    this._likeState(); 
    this.likeCounte(this._likes);
      // Вернём элемент 
    return this._element;     
  }

  _likeState(){
    // Слушатель лайка
    this._likeBtn.addEventListener('click', () => {      
      if( this._likeBtn.classList.contains('element__like_active')){
        this._likeOff();
      } else {
        this._likeOn();
      }  
    }); 
  }

  _likeActive(){
    this._likeBtn.classList.add('element__like_active');
  }
  _likeUnactive(){
    this._likeBtn.classList.remove('element__like_active');
  }

  
  _isLiked(data){
    if(data.find((item) => item._id === this._myId)){
      return true;
    } else {
      return false;
    }
  }
  
  // ставим количество на счетчике и активный класс лайку
  checkLikeClass(){
    if( this._likeBtn.classList.contains('element__like_active')){
      this._likeUnactive();
    } else {
      this._likeActive();
    }
  }

  //  счетчик лайков
  likeCounte(item){ 
    this._likes = item;
    this._likeCounter.textContent = this._likes.length;
  }

  //  отображение кнопки корзинки удаления+слушатель на нее  
  showDelBtn() { 
    if (this._ownerId === this._myId) {this._delBtn.addEventListener('click', 
      this._showAndDelete)}
    else  {
      this._delBtn.remove();
    }
  }

  deleteCard() {    
    () => {this._element.remove()};
    this._element = null;
  }

  _setEventListeners() {   
    this._elementImage.addEventListener('click', () =>{this._handleCardClick(this._image, this._title)}); 
  }
}
